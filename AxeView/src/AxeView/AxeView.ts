﻿import { OverwatchInterface } from "./OverwatchInterface";
export * from "./OverwatchInterface";

import { AxeViewDomInterface, AxeViewMoveType } from "./AxeViewDomInterface";
export * from "./AxeViewDomInterface";

import { OverwatchingType, OverwatchingOutputType } from "./OverwatchingType"
export * from "./OverwatchingType";

import { Overwatch } from "./Overwatch"
export * from "./Overwatch";

import { OverwatchDomPushHelper } from "./OverwatchDomPushHelper"



import { AxeDomHelper } from "./AxeDomHelper"
export *  from "./AxeDomHelper";

import { AxeDomHelperOptionInterface } from "./AxeDomHelperOptionInterface"
export * from "./AxeDomHelperOptionInterface";


/** AxeView 구현 */
export default class AxeView
{
	/** 
	 *  이 클래스가 바인딩한 아이템의 개수
	 *  고유번호 지정에 사용된다.
	 * */
	private BindCount: number = 0;

	/**
	 * 완성된 돔에 추가처리를 할 헬퍼
	 */
	public AxeDomHelper: AxeDomHelper;


	/**
	 * html의 주석을 제거할지 여부
	 * 능동적으로 찾아서 지우는게 아니라 노드 검색시 주석이 발견되면 지우게 된다.
	 * */
	public CommentDelete: boolean = false;

	/** 마지막으로 사용한 감시대상 리스트*/
	public LastList: Overwatch[] = [];
	/** 감시대상의 처리를 공통화 해주는 도우미 */
	private OverwatchDomPushHelper: OverwatchDomPushHelper;
	
	/**
	 * 
	 * @param jsonDomHelperOption 헬퍼를 사용할때 전달할 옵션
	 */
	constructor(jsonDomHelperOption?: AxeDomHelperOptionInterface | null)
	{
		this.AxeDomHelper = new AxeDomHelper(jsonDomHelperOption);
		this.OverwatchDomPushHelper = new OverwatchDomPushHelper();
	}

	/**
	 * 지정된 HTMLElement의 내용물을 다시 그리고, 타겟 감사자를 찾아 연결한다.
	 * ☆ 주의 ☆ 기존 내용물은 모두 제거되고 새로 그려진다.
	 * 새로 그리면서 감시자를 연결한다.
	 * 
	 * 기존 내용물을 남기고 부분교체하는 방법을 찾아보았지만 정답이 없어서
	 * 그냥 새로그리는 방법을 사용하기로 결정하였다.
	 * @param domParent 검색할 부모 dom
	 * @param arrTarget 감시자 리스트
	 */
	public BindOverwatch(
		domParent: HTMLElement
		, arrTarget: Overwatch[])
		: void;

	/**
	 * 지정된 HTMLElement의 내용물을 다시 그리고, 타겟 감사자를 찾아 연결한다.
	 * ☆ 주의 ☆ 기존 내용물은 모두 제거되고 새로 그려진다.
	 * 새로 그리면서 감시자를 연결한다.
	 * 지정된 돔 옵션에 따른 추가작업을 한다.
	 * 
	 * 기존 내용물을 남기고 부분교체하는 방법을 찾아보았지만 정답이 없어서
	 * 그냥 새로그리는 방법을 사용하기로 결정하였다.
	 * 단, 텍스트 노드가 없
	 * 
	 * 텍스트 노드가 아닌 대상을 감시할때는 
	 * @param domParent 검색할 부모 dom
	 * @param arrTarget 감시자 리스트
	 * @param jsonDomHelperOption 처리 옵션
	 */
	public BindOverwatch(
		domParent: HTMLElement
		, arrTarget: Overwatch[]
		, jsonDomHelperOption: AxeDomHelperOptionInterface | null	)
		: void;

	/**
	 * 지정된 HTMLElement의 내용물을 다시 그리고, 타겟 감사자를 찾아 연결한다.
	 * ☆ 주의 ☆ 기존 내용물은 모두 제거되고 새로 그려진다.
	 * 새로 그리면서 감시자를 연결한다.
	 * 
	 * 기존 내용물을 남기고 부분교체하는 방법을 찾아보았지만 정답이 없어서
	 * 그냥 새로그리는 방법을 사용하기로 결정하였다.
	 * 단, 텍스트 노드가 없
	 * 
	 * 텍스트 노드가 아닌 대상을 감시할때는 
	 * @param domParent 검색할 부모 dom
	 * @param arrTargetOw 감시자 리스트
	 * @param jsonDomHelperOption 처리 옵션
	 */
	public BindOverwatch(
		domParent: HTMLElement
		, arrTargetOw: Overwatch[]
		, jsonDomHelperOption?: AxeDomHelperOptionInterface | null)
		: void
	{
		//html 특성상 내용물의 부분 교체가 불가능하다.(무조건 대상을 싹 새로 고친다.)
		//이 문제 때문에 모니터링이 재대로 안될 수 있다.
		//
		//복잡한 조건을 지킨다면 엘리먼트들을 그대로 두더라도 모니터링이 가능하다.
		//1) 모니터링 할 대상의 앞뒤로 textnode를 분리할 수 있는 엘리먼트(html 태그같은 것들) 들어가고
		//2) 단순 문자열일 때 (html은 안됨)
		//즉, .childNodes 로 봤을때 분리되는 단순 문자열이면 가능하다.
		//
		//처음에는 이런 예외적인 사항을 따로 관리하도록 구현했지만
		//다양한 기능을 추가하면서 이런 예외를 따로 분리해주는 코드가 복잡해지는 문제가 발생하여
		//그냥 모든 개체를 다시 생성하는 방향으로 재구현 하였다.
		//
		//버전2에서 다시 도전해볼 예정이다.


		if (!(domParent))
		{
			throw "검색할 dom 을 전달해야 합니다.";
		}


		//감시 리스트 백업
		this.LastList = arrTargetOw;

		//let objThis: AxeView = this;
		//각 감시자별로 처리해야할 내용
		arrTargetOw.forEach(
			(item) =>
			{
				++this.BindCount;
				//고유번호 지정
				item.MyNumber = this.BindCount;
			});

		//새로운 로드를 생성해서 가지고 있을 노드 리스트
		let newParent: ChildNode[] = [];
		//자식만 추가한다.
		newParent.push(
			...Array.from(
				this.NodeMatch_Normal(domParent, arrTargetOw)
					.childNodes));

		
		//console.log("***** newParent *****");
		//console.log(newParent);
		//새로 만든 노드를 넣어준다.
		domParent.replaceChildren(...newParent);


		//노드리스트가 완성되고 나서 처리해야 할 내용들
		//노드를 옮기고 나서 갱신해야 최상위 돔을 못찾는 오류를 막을 수 있다.
		for (let i = 0; i < arrTargetOw.length; ++i)
		{
			//감시자와 연결된 dom의 정보를 갱신한다.
			arrTargetOw[i].Dom_AxeViewList_Refresh();
		}//end for i

		//지정된 돔을 옵션처리 한다.
		this.DomHelper(domParent, jsonDomHelperOption);

		//돔 교체 작업을 해준다.
		this.AxeDomHelper.DomReplace(arrTargetOw);
	}




	/**
	 * 지정된 텍스트 노드에서 감시자와의 매칭 정보를 찾고
	 * 새로운 노드를 생성하여 리턴한다.
	 * @param nodeText
	 * @param owTarget 매칭시킬 감시대상 개체
	 * @param refMatch
	 * @returns 새로 생성된 ChildNode
	 */
	private NodeMatch_Text(
		nodeText: Text
		, owTarget: Overwatch[])
		: ChildNode[]
	{
		let newParent: ChildNode[] = [];

		//이 텍스트를 잘라서 사용하고 완성된 텍스트 노드
		//이 한 노드에서 여러개의 매칭 데이터가 있을 수 있으므로
		//각자 쪼게서 쓴다음 해당 위치에 쪼겐 데이터를 넣어 완성시켜야 한다.
		//이렇게 안하면 원본 텍스트를 여러번 쓰게 되므로 같은 줄이 여러번 나오는 문제가 있다.
		let arrStrText: MatchStringInterface[] = [];
		//초기값으로 전달받은 텍스트를 그대로 넣어 준다.
		arrStrText.push({ Text: nodeText.textContent, Overwatch: null, Match: false });

		
		for (let nOverwatchIdx = 0
			; nOverwatchIdx < owTarget.length
			; ++nOverwatchIdx)
		{//감시자 검색
			let itemOW: Overwatch = owTarget[nOverwatchIdx];

			//console.log("arrStrText : " + itemOW.NameFindString);
			//console.log(arrStrText);

			if (true === itemOW.OverwatchingOneIs
				&& true === itemOW.OneDataIs)
			{//하나만 모니터링 하는 옵션
				//이미 적중한 대상이 있다.

				//다음 검색을 할 필요가 없다.
				continue;
			}
			else
			{
				//arrStrText에 바로 반영한다.
				this.NodeMatch_String(arrStrText, itemOW);
			}
			
		}//end for nOverwatchIdx



		//잘라진 데이터를 노드로 변환한다.
		for (let i = 0; i < arrStrText.length; ++i)
		{
			let itemStrText: MatchStringInterface = arrStrText[i];
			//이번 루프에 사용하는 감시대상 지정
			this.OverwatchDomPushHelper.OverwatchSet(itemStrText.Overwatch);

			if (null === itemStrText.Overwatch)
			{//내용물은 있는데 감시자가 없다.

				//일반 택스트라는 소리다.
				//textnode를 생성해서 추가한다.
				newParent.push(document.createTextNode(itemStrText.Text));
			}
			else if (OverwatchingOutputType.String === itemStrText.Overwatch.OverwatchingOutputType
					&& OverwatchingType.OutputFirst === itemStrText.Overwatch.OverwatchingType)
			{//감시 타입이 단순 문자열 출력이다.

				//일반 택스트라는 소리다.
				//textnode를 생성해서 추가한다.
				newParent.push(
					document.createTextNode(
						itemStrText.Overwatch.data));
			}
			else if (OverwatchingOutputType.String === itemStrText.Overwatch.OverwatchingOutputType
				&& (OverwatchingType.Monitoring === itemStrText.Overwatch.OverwatchingType
					|| OverwatchingType.Monitoring_OneValue === itemStrText.Overwatch.OverwatchingType))
			{//문자열 모니터링이다.

				if ("" === itemStrText.Text)
				{//내용물이 없다.
					continue;
				}
				else if (null !== itemStrText.Overwatch)
				{//매칭된 감시자가 있다.

					//dom을 만들고
					let newTextDom: Text = document.createTextNode(itemStrText.Overwatch.data);
					//부모에 전달
					newParent.push(newTextDom);
					//감시자에 추가
					this.OverwatchDomPushHelper
						.Dom_Push_Node(newTextDom, itemStrText.Text);
				}
				else
				{//내용물은 있는데 감시자가 없다.

					//일반 택스트라는 소리다.
					//textnode를 생성해서 추가한다.
					newParent.push(document.createTextNode(itemStrText.Text));
				}
			}
			else if (OverwatchingOutputType.Html === itemStrText.Overwatch.OverwatchingOutputType)
			{//감시 타입이 html 출력이다.

				if ("" === itemStrText.Text)
				{//내용물이 없다.
					continue;
				}
				else if (null !== itemStrText.Overwatch)
				{//매칭된 감시자가 있다.

					//2024-03-08 : FirstData으로 HTMLElement이 들어와도 처리되도록 변경
					let domNewMElem: HTMLElement;

					if (true === (itemStrText.Overwatch.data instanceof HTMLElement))
					{//데이터가 HTMLElement타입이다.

						domNewMElem = itemStrText.Overwatch.data as HTMLElement;
					}
					else
					{//나머지는 html string 취급한다.

						//html 개체를 만들고
						let domTemp: HTMLTemplateElement
							= document.createElement("template");
						//내용물을 html 처리를 한 후
						domTemp.insertAdjacentHTML(
							"beforeend"
							, itemStrText.Overwatch.data);

						domNewMElem = domTemp.firstChild as HTMLElement;
					}


					//리턴 리스트에 추가
					newParent.push(domNewMElem);

					if (OverwatchingType.Monitoring === itemStrText.Overwatch.OverwatchingType
						|| OverwatchingType.Monitoring_OneValue === itemStrText.Overwatch.OverwatchingType)
					{//모니터링이다.

						//감시자  dom리스트에 추가
						this.OverwatchDomPushHelper.Dom_Push_HTMLElement(
							domNewMElem, itemStrText.Text);
					}
				}
				else
				{//아무조건도 맞지 않는다.

					//임시로 텍스트 노드로 생성한다.
					//원칙적으로는 여기에 오면 안된다.
					newParent.push(document.createTextNode(itemStrText.Text));
					//debugger;
				}
			}
		}//end for i


		//console.log("▷▷▷ newParent End : " + nodeText.textContent);
		//console.log(newParent);
		//console.log("◁◁ ◁ ");

		return newParent;
	}

	/**
	 * 일반 노드(재귀를 한다)
	 * 내용물을 분석하여 감시자가 연결된 부모노드(HTMLElement)를 새로 생성한다.
	 * 텍스트 노드만 있을 때까지 재귀하게 된다.
	 * 텍스트 노드는 감시자와 비교하여 잘라내고, 
	 * 감시자를 연결하고 새로 생성된 HTMLElement을 리턴한다.
	 * @param nodeParent
	 * @param owTargetList
	 */
	private NodeMatch_Normal(
		nodeParent: ChildNode
		, owTargetList: Overwatch[])
		: HTMLElement
	{

		//부모노드로 새 엘리먼트를 생성한다.
		//자신의 노드만 생성한다.
		//let newElemParent: HTMLElement = document.createElement(nodeParent.nodeName);
		let newElemParent: HTMLElement = nodeParent.cloneNode(false) as HTMLElement;

		//엘리먼트를 유지하기위해 새로 생성한 부모노드에 엘리먼트를 복사한다.
		//Array.from((nodeParent as HTMLElement).attributes)
		//	.forEach(attr => { newElemParent.setAttribute(attr.nodeName, attr.nodeValue) });
		
		//이 노드의 자식 노드 추출
		let arrChildNode: ChildNode[] = Array.from(nodeParent.childNodes);
		
		//자식 노드 만큼 검사
		for (let nChildNodeIdx: number = 0
			; nChildNodeIdx < arrChildNode.length
			; ++nChildNodeIdx)
		{

			//검사할 노드
			let itemNode: ChildNode = arrChildNode[nChildNodeIdx];

			if (Node.TEXT_NODE === itemNode.nodeType)
			{//텍스트 노드다

				//텍스트 노드를 생성하고
				let newText: ChildNode[]
					= this.NodeMatch_Text(itemNode as Text, owTargetList);
				//노드에 추가
				for (let nNewTextIdx = 0; nNewTextIdx < newText.length; ++nNewTextIdx)
				{
					let itemText: ChildNode = newText[nNewTextIdx];
					if (itemText)
					{
						newElemParent.appendChild(itemText);
					}
					else
					{
						//'OverwatchingOutputType.Html'를 사용한 경우 'FirstData'에 부모가될 HTML string를 꼭 넣어야 합니다.
						throw "If you use 'OverwatchingOutputType.Html', you must enter the HTML string that will be the parent in 'FirstData'.";
					}
					
				}

			}
			else if (Node.COMMENT_NODE === itemNode.nodeType)
			{
				if (false === this.CommentDelete)
				{
					//주석은 그대로 추가한다.(바인딩 안함)
					newElemParent.appendChild(itemNode);
				}
			}
			else
			{//일반 노드

				//엘리먼트 검사

				//새 엘리먼트를 매칭 시키고
				let newNodeMatch: HTMLElement
					= this.NodeMatch_Normal(itemNode, owTargetList);

				
				//새 엘리먼트의 어트리뷰트 판단.
				this.NodeMatch_Attr(
					itemNode
					, newNodeMatch
					, owTargetList);
				
				//새 부모에 추가
				newElemParent.appendChild(newNodeMatch);
			}

		}//end for nChildNodeIdx


		return newElemParent;
	}

	/**
	 * 지정된 문자열을 감시자와 비교하여 자르고,
	 * 지정된 감시자가 감시할게 있는지 확인하여 
	 * 잘라진 리스트를 리턴한다.
	 * @param sText
	 * @param owTarget
	 */
	private NodeMatch_TextCut(
		sText: string
		, owTarget: Overwatch)
		: MatchStringInterface[]
	{
		let arrStrText: MatchStringInterface[] = [];

		//검사할 값 임시 저장
		let sTemp: string = sText;


		//문자열에서 데이터가 일치한 인덱스
		let nFindIdx: number = -1;

		//debugger;

		while(true)
		{
			if (true === owTarget.OverwatchingOneIs
				&& true === owTarget.OneDataIs)
			{
				//이미 하나가 일치했으니 더 검사할 필요가 없다.
				break;
			}

			//정규식으로 액스뷰 형식 찾기
			owTarget.NameFindString.lastIndex = 0;
			let arrRegExpTemp: RegExpExecArray
				= owTarget.NameFindString.exec(sTemp);
				

			//일치하는게 있었는지 검사
			if (null === arrRegExpTemp
				|| 0 >= arrRegExpTemp.length)
			{//일치하는게 하나도 없다.
				break;
			}


			//일치하는 데이터 처리 *****
			if (OverwatchingType.Unidentified === owTarget.OverwatchingType)
			{//감시타입이 불확실이다.

				//모니터링으로만 동작한다.
				owTarget.OverwatchingType = OverwatchingType.Monitoring;
			}

			//시작 인덱스 저장
			nFindIdx = arrRegExpTemp.index;
			owTarget.OneDataIs = true;

			if (0 !== nFindIdx)
			{//검색값이 0이다.

				//검색된값이 맨앞에 있다는 의미이므로 빈값은 추가할 필요가 없다.
				
				//앞에 값 추가
				arrStrText.push({
					Text: sTemp.substring(0, nFindIdx)
					, Overwatch: null
					, Match: false
				});
			}

			//일치값 추가
			arrStrText.push({
				Text: arrRegExpTemp[0]
				, Overwatch: owTarget
				, Match: true
			});

			//뒤에값은 한번 더 검사해야하니 임시저장
			sTemp = sTemp.substring(nFindIdx + arrRegExpTemp[0].length);

			if ("" === sTemp)
			{//뒤에 값이 없다.

				//뒤에 값이 없으면 더 검사할 필요가 없다.
				break;
			}
			//console.log("NodeMatch_TextCut(" + owTarget.NameFindString + ") : " + sTemp);

		}//end while(true)
		

		//남은것 추가
		arrStrText.push({
			Text: sTemp
			, Overwatch: null
			, Match: false
		});

		return arrStrText;
	}

	/**
	 * 문자열 리스트를 한개의 감시자와 매칭 시키면서 자른다.
	 * 한개의 감시자 기준이므로 결과물이 앞에서 뒤로 쌓인다.
	 * @param arrStrText 검사 및 변형할 텍스트 배열
	 * @param itemOW
	 */
	private NodeMatch_String(
		arrStrText: MatchStringInterface[]
		, itemOW: Overwatch)
	{

		//잘려진 문자열중 일치하는 문자열이 있는지 확인한다.
		for (let nFindTextIdx = 0
			; nFindTextIdx < arrStrText.length
			; ++nFindTextIdx)
		{
			let itemFindText: MatchStringInterface = arrStrText[nFindTextIdx];

			//일치하는 문자열 찾기
			let nFindIdx = -1;

			//정규식으로 액스뷰 형식 찾기
			//일치하는 문자열 찾기
			itemOW.NameFindString.lastIndex = 0;
			let arrRegExpTemp: RegExpExecArray
				= itemOW.NameFindString.exec(itemFindText.Text);

			if (null !== arrRegExpTemp)
			{//일치하는게 있다.
				nFindIdx = arrRegExpTemp.index;
			}

			if (0 <= nFindIdx
				&& itemFindText.Match === false)
			{//있다.
				//이미 매칭된 텍스트는 수정할 필요가 없다.

				//if (itemOW.NameFindString === "{{HtmlTest}}") debugger;
				//적중한 대상이 있다.
				//여기서 itemOW.OneDataIs = true;를 넣어버리면
				//텍스트를 쪼겔때 이미 매칭된 결과로 표시되서 쪼게지지 않는다.
				//예> this.NodeMatch_TextCut
				//각 if문 안에서 필요에 따라 변경하자

				if (OverwatchingType.Unidentified === itemOW.OverwatchingType)
				{//감시타입이 불확실이다.

					//모니터링으로만 동작한다.
					itemOW.OverwatchingType = OverwatchingType.Monitoring;
				}

				let arrStrTextCut: MatchStringInterface[]
					= this.NodeMatch_TextCut(itemFindText.Text, itemOW);

				//잘린 대상의 뒤에 추가하고 잘린대상은 지운다.
				arrStrText.splice(nFindTextIdx, 1, ...arrStrTextCut);

			}//end if (0 <= nFindIdx)
		}//end for nFindTextIdx
	}

	/**
	 * 어트리뷰트의 내용을 매칭시킨다.
	 * 어트리뷰트는 새로 생성하지 안으므로 'nodeParent'를 직접 수정한다.
	 * @param nodeParent 이 어트리뷰트가 소속된 개체의 원본
	 * @param nodeParentNew 이 어트리뷰트가 소속된 개체
	 * @param owTarget
	 */
	private NodeMatch_Attr(
		nodeParent: ChildNode
		, nodeParentNew: ChildNode
		, owTarget: Overwatch[])
	{

		//어트리뷰트를 추출한다.
		let arrAttr: Attr[] = Array.from((nodeParentNew as HTMLElement).attributes);

		
		//
		for (let nAttrIdx: number = 0
			; nAttrIdx < arrAttr.length
			; ++nAttrIdx)
		{
			//검사할 어트리뷰트
			let itemAttr: Attr = arrAttr[nAttrIdx];

			this.NodeMatch_AttrOne(itemAttr, owTarget, nodeParent, nodeParentNew);

		}
	}

	/**
	 * 어트리뷰트 한개의 내용을 매칭 시킨다.
	 * @param attrItem
	 * @param owTarget
	 * @param nodeParent 이 어트리뷰트가 소속된 개체의 원본
	 * @param nodeParentNew 이 어트리뷰트가 소속된 개체
	 */
	private NodeMatch_AttrOne(
		attrItem: Attr
		, owTarget: Overwatch[]
		, nodeParent: ChildNode
		, nodeParentNew: ChildNode)
	{
		for (let nOverwatchIdx = 0
			; nOverwatchIdx < owTarget.length
			; ++nOverwatchIdx)
		{
			let itemOW: Overwatch = owTarget[nOverwatchIdx];
			//이번 루프에 사용하는 감시대상 지정
			this.OverwatchDomPushHelper.OverwatchSet(itemOW);

			if (OverwatchingType.Unidentified === itemOW.OverwatchingType
				&& "on" === attrItem.name.substring(0, 2).toLocaleLowerCase())
			{//불확실 타입인데
				//앞에 2글자가 on이다.

				//이 조건은 무조건 Function_NameRemoveOn으로 동작한다.
				itemOW.OverwatchingOutputType = OverwatchingOutputType.Function_NameRemoveOn;
			}

			if (true === itemOW.OverwatchingOneIs
				&& true === itemOW.OneDataIs)
			{//하나만 모니터링 하는 옵션
				//이미 적중한 대상이 있다.

				//다음 검색을 할 필요가 없다.
				continue;
			}
			else if (OverwatchingOutputType.Html === itemOW.OverwatchingOutputType)
			{//html 옵션이다.

				//속성에 html은 넣을 수 없으므로 이 옵션은 무시한다.
				continue;
			}
			else if (OverwatchingOutputType.Function === itemOW.OverwatchingOutputType
				|| OverwatchingOutputType.Function_NameRemoveOn === itemOW.OverwatchingOutputType)
			{//함수

				//debugger;

				//정규식으로 액스뷰 형식 찾기
				itemOW.NameFindString.lastIndex = 0;
				let arrRegExpTemp: RegExpExecArray
					= itemOW.NameFindString.exec(attrItem.value);
				
				//함수는 부분교체가 없으므로 무조건 전체 비교다.
				if (null !== arrRegExpTemp
					&& 0 < arrRegExpTemp.length)
				{//일치한다.

					if (OverwatchingType.Unidentified === itemOW.OverwatchingType)
					{//감시타입이 불확실이다.

						//모니터링으로만 동작한다.
						itemOW.OverwatchingType = OverwatchingType.Monitoring;
						if ("function" !== typeof itemOW.data)
						{//데이터가 함수형이 아니다.

							//함수형 데이터로 초기화한다.
							itemOW.data = () => { };
						}
						
					}

					let elemTemp: HTMLElement = nodeParentNew as HTMLElement;
					//속성에 기존 이름 제거
					elemTemp.removeAttribute(attrItem.name);

					//감시자에 추가
					itemOW.OneDataIs = true;
					if (OverwatchingType.Monitoring === itemOW.OverwatchingType
						|| OverwatchingType.Monitoring_OneValue === itemOW.OverwatchingType)
					{
						this.OverwatchDomPushHelper
							.Dom_Push_Event(
								nodeParentNew
								, arrRegExpTemp[0]
								, attrItem.name
								, true);
					}
					else
					{
						//돔에는 추가하지 않는다.
						this.OverwatchDomPushHelper
							.Dom_Push_Event(
								nodeParentNew
								, arrRegExpTemp[0]
								, attrItem.name
								, false);
					}

				}
			}
			else
			{//문자열과 이외의 상황

				//함수를 제외한 속성은 문자열로만 동작한다.
				//console.log("attrItem : " + attrItem.name + ", " + attrItem.value);
				//debugger;

				//이 if문 안에서 결과가 일치했는지 여부
				let bComplete = false;
				

				if (false === bComplete
					&& "value" === attrItem.name
					&& (OverwatchingType.Monitoring_AttrValue === itemOW.OverwatchingType
						|| OverwatchingType.Monitoring_AttrValue_Input === itemOW.OverwatchingType
						|| OverwatchingType.Unidentified === itemOW.OverwatchingType))
				{//속성이름이 'value'이고
					//값을 모니터링 중이거나
					//아웃풋 타입이 불확실 타입이다.

					bComplete = true;


					//정규식으로 액스뷰 형식 찾기
					itemOW.NameFindString.lastIndex = 0;
					let arrRegExpTemp: RegExpExecArray
						= itemOW.NameFindString.exec(attrItem.value);

					if (null !== arrRegExpTemp
						&& 0 < arrRegExpTemp.length)
					{
						//값(value)은 다른속성과 다르게 부모의 필드에 바인딩되는 녀석이라
						//그냥 속성개체를 저장하면 UI에서 입력된 값을 읽을 수 없다.
						//정확하게는 ui에서 수정하면 읽어지질 않는다...(개체가 달라지나????)
						//
						//그래서 이벤트 리스너로 처리하도록 수정하였다.

						if (OverwatchingType.Unidentified === itemOW.OverwatchingType)
						{//감시타입이 불확실이다.

							//불확실 타입인데 속성이름이 'value'이면 
							//감시타입(OverwatchingType)을 아래 조건으로 변경한다.
							if ("INPUT" === (nodeParent as Element).tagName)
							{//대상이 input이다.
								itemOW.OverwatchingType = OverwatchingType.Monitoring_AttrValue_Input;
							}
							else
							{//input가 아니다.
								itemOW.OverwatchingType = OverwatchingType.Monitoring_AttrValue;
							}
						}
						

						//이 옵션에서는 아래 조건 말고는 동작하지 않는다.
						if (OverwatchingOutputType.String === itemOW.OverwatchingOutputType)
						{//출력 방식이 'string'이다.

							//초기값 입력
							attrItem.value = itemOW.data;

							//감시자에 추가
							itemOW.OneDataIs = true;

							//감시할 돔 추가
							//속성의 값(value)만을 모니터링 하는 옵션이다.
							this.OverwatchDomPushHelper
								.Dom_Push_Attr_ValueMonitoring(
									nodeParentNew, arrRegExpTemp[0]);
						}
					}
				}


				if (false === bComplete
					&& "" === attrItem.value)
				{//벨류가 없으면 이름만 있는 속성이다.

					bComplete = true;

					//정규식으로 액스뷰 형식 찾기
					//속성이름은 소문자로만 오므로 소문자 처리해야한다. 
					itemOW.NameFindStringLowerCase.lastIndex = 0;
					let arrRegExpTemp: RegExpExecArray
						= itemOW.NameFindStringLowerCase.exec(attrItem.name);

					if (null === arrRegExpTemp)
					{//일치하는게 없다.
					}
					else if (0 < arrRegExpTemp.length)
					{//이름이 감시자와 일치한다.

						if (OverwatchingType.Unidentified === itemOW.OverwatchingType)
						{//감시타입이 불확실이다.

							//모니터링으로만 동작한다.
							itemOW.OverwatchingType = OverwatchingType.Monitoring;
						}

						if (OverwatchingOutputType.Dom === itemOW.OverwatchingOutputType)
						{//돔 개체
							
							//소속된 개체를 저장한다.
							let elemTemp: HTMLElement = nodeParentNew as HTMLElement;
							//기존 이름 제거
							elemTemp.removeAttribute(attrItem.name);
							//2023-07-04 : 돔 교체를 지원하기 위해 모니터링에 추가함
							this.OverwatchDomPushHelper
								.Dom_Push_Dom(elemTemp, arrRegExpTemp[0]);

						}
						else
						{//일반적인 이름

							//감시자의 값으로 변경
							let elemTemp: HTMLElement = nodeParentNew as HTMLElement;
							//기존 이름 제거
							elemTemp.removeAttribute(attrItem.name);
							
							if ("" === itemOW.data
								|| " " === itemOW.data)
							{//값이 없다.

								//이름만 있는 속성의 경우 기존 이름이 없으면 안되므로
								//임의의 값을 생성하여 넣어준다.
								itemOW.data = attrItem.name.substring(2, attrItem.name.length - 2);
							}

							//새 이름 추가(값없음)
							elemTemp.setAttribute(itemOW.data, "");	
							
							

							//감시자에 추가
							itemOW.OneDataIs = true;
							if (OverwatchingType.Monitoring === itemOW.OverwatchingType
								|| OverwatchingType.Monitoring_OneValue === itemOW.OverwatchingType) 
							{//모니터링이다.

								//감시할 돔 추가
								this.OverwatchDomPushHelper
									.Dom_Push_Valueless(nodeParentNew, arrRegExpTemp[0]);
							}
						}
					}
				}

				if (false === bComplete)
				{

					//정규식으로 액스뷰 형식 찾기
					itemOW.NameFindString.lastIndex = 0;
					let arrRegExpTemp: RegExpExecArray
						= itemOW.NameFindString.exec(attrItem.value);

					if (null === arrRegExpTemp)
					{//일치하는게 없다.
					}
					else if (attrItem.value === arrRegExpTemp[0])
					{//벨류가 하나만 있고, 이것이 일치 한다.
						bComplete = true;

						if (OverwatchingType.Unidentified === itemOW.OverwatchingType)
						{//감시타입이 불확실이다.

							//모니터링으로만 동작한다.
							itemOW.OverwatchingType = OverwatchingType.Monitoring;
						}

						//초기값 입력
						attrItem.value = itemOW.data;

						//감시자에 추가
						itemOW.OneDataIs = true;
						if (OverwatchingType.Monitoring === itemOW.OverwatchingType)
						{//모니터링이다.

							//감시할 돔 추가
							this.OverwatchDomPushHelper
								.Dom_Push_ReplaceValue(
									attrItem
									, arrRegExpTemp[0]);
						}
						else if (OverwatchingType.Monitoring_OneValue === itemOW.OverwatchingType)
						{//하나의 값만 사용하는경우

							//감시할 돔 추가
							this.OverwatchDomPushHelper
								.Dom_Push_OneValue(
									attrItem
									, arrRegExpTemp[0]);
						}
					}
					else
					{//값에 부분 일치가 있다.
						bComplete = true;

						if (OverwatchingType.Unidentified === itemOW.OverwatchingType)
						{//감시타입이 불확실이다.

							//모니터링으로만 동작한다.
							itemOW.OverwatchingType = OverwatchingType.Monitoring;
						}						

						if (true === itemOW.OverwatchingOneIs)
						{//하나만 교체
							attrItem.value
								= attrItem.value.replace(
									arrRegExpTemp[0]
									, itemOW.data);
						}
						else
						{//전체 교체
							attrItem.value = this.ReplaceAll(
								attrItem.value
								, arrRegExpTemp[0]
								, itemOW.data);
						}


						//감시자에 추가
						itemOW.OneDataIs = true;
						if (OverwatchingType.Monitoring === itemOW.OverwatchingType
							|| OverwatchingType.Monitoring_OneValue === itemOW.OverwatchingType)
						{//모니터링 이다.

							//돔추가
							this.OverwatchDomPushHelper
								.Dom_Push_ReplaceValue(
									attrItem
									, arrRegExpTemp[0]);
						}
					}
				}


			}//end if (true === itemOW.OverwatchingOneIs

		}//end for nOverwatchIdx
	}

	/**
	 * 지정된 엘리먼트에 비어있지 않은 textnode가 한개라도 있는지 확인한다.
	 * 한개라도 있으면 true
	 * @param el
	 */
	private TextNodesIs(el: Element): boolean
	{
		// https://stackoverflow.com/a/44516001/6725889

		let bReturn: boolean = false;

		const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
		
		while (walker.nextNode())
		{
			let sTemp: string = walker.currentNode.textContent;

			//직접 정규식을 써야 제거가 되서 'ReplaceAll'를 쓰지 않음
			sTemp = sTemp.replace(/\n/g, "");
			sTemp = sTemp.replace(/\t/g, "");

			if ("" !== sTemp)
			{//하나라도 텍스트 노드 데이터가 있으면

				bReturn = true;
				break;
			};
		}
		return bReturn;
	}



	/**
	 * 지정한 문자열을 모두 찾아 
	 * @param sOriData 원본
	 * @param sSearch 찾을 문자열
	 * @param sReplacement 바꿀 문자열
	 * @returns 완성된 결과
	 */
	private ReplaceAll(sOriData: string, sSearch: string, sReplacement: string): string
	{
		return sOriData.replace(new RegExp(sSearch, 'g'), sReplacement);
	}

	/**
	 * 지정된 돔을 옵션에 따라 처리한다.
	 * @param domTarget 처리할 돔
	 * @param jsonDomHelperOption 처리 옵션
	 */
	public DomHelper(
		domTarget: HTMLElement
		, jsonDomHelperOption?: AxeDomHelperOptionInterface | null)
		: void
	{
		//돔 처리
		this.AxeDomHelper.DomHelping(domTarget, jsonDomHelperOption);
	}


	// #region 리스트 관리 기능

	/**
	 * 사용할 감시 대상 리스트를 설정한다.
	 * @param arrOverwatch
	 */
	public ListSet = (arrOverwatch: Overwatch[]): void =>
	{
		this.LastList = arrOverwatch;
	}

	/**
	 * 가지고 있는 리스트에서 이름으로 감시대상을 찾는다.
	 * @param sName
	 * @returns
	 */
	public FindName = (sName: string): Overwatch | null =>
	{
		return this.LastList.find(f => f.Name === sName);

	}
	// #endregion


	// #region 감시대상(Overwatch) 생성 기능

	/**
	 * 감시대상 전체 옵션을 가지고 새로 생성한다.
	 * @param target
	 * @returns
	 */
	public New_All(target: OverwatchInterface): Overwatch
	{
		return new Overwatch(target);
	}

	/**
	 * 단순 문자열 출력만 한다.(전체 검사)
	 * @param sName
	 * @param sData
	 */
	public New_OutputString(sName: string, sData: string): Overwatch
	{
		return new Overwatch({
			Name: sName
			, FirstData: sData
			, OverwatchingOutputType: OverwatchingOutputType.String
			, OverwatchingType: OverwatchingType.OutputFirst
			, OverwatchingOneIs: false
		});
	}

	/**
	 * 대상을 모니터링 하는 문자열.(전체 검사)
	 * @param sName
	 * @param sData
	 */
	public New_MonitoringString(sName: string, sData: string): Overwatch
	{
		return new Overwatch({
			Name: sName
			, FirstData: sData
			, OverwatchingOutputType: OverwatchingOutputType.String
			, OverwatchingType: OverwatchingType.Monitoring
			, OverwatchingOneIs: false
		});
	}
	// #endregion
}



/** 문자열과 매칭된 감시자 */
interface MatchStringInterface
{
	/** 매칭된 문자열. 혹은 남은 문자열 */
	Text: string 
	/** 매칭된 감시자. 매칭이 없는경우 null */
	, Overwatch: Overwatch | null
	/** 명시적으로 매칭됐는지 여부. 
	 * 감시자가 없어도 매칭에 사용되지 않을 문자열은 이것을 true로 해둔다.*/
	, Match: boolean
}
