import { OverwatchInterface } from "./OverwatchInterface";
export * from "./OverwatchInterface";

import { AxeViewDomInterface, AxeViewDomType } from "./AxeViewDomInterface";
export * from "./AxeViewDomInterface";

import { OverwatchingType } from "./OverwatchingType"
export * from "./OverwatchingType";

import { Overwatch } from "./Overwatch"
export * from "./Overwatch";

/** AxeView 구현 */
export default class AxeView
{
	/**
	 * 이를 생성에 사용하는 엘리먼트 이름
	 */
	private _ElementName: string = "axeview";

	/** 
	 *  이름 생성에 사용하는 카운터
	 *  이 이름 생성문제때문에 가능하면 이 개체의 인스턴스는 재활용하는 것이 좋다.
	 * */
	private _nNameCount: number = 0;

	constructor()
	{
	}

	/**
	 * 지정된 HTMLElement에서 타겟을 찾아 연결한다.
	 * @param domHtml 검색할 dom
	 * @param arrTarget
	 */
	HtmlToOverwatch(
		domHtml: HTMLElement
		, arrTarget: Overwatch[])
	{

		if (!(domHtml))
		{
			throw "검색할 dom 을 전달해야 합니다.";
		}

		let objThis = this;

		//domHtml에서 대상을 찾는다.

		

		//모든 태그 검색
		let arrElemAll: Element[] = Array.from(domHtml.getElementsByTagName("*"));

		//html 특성상 내용물의 부분 교체가 불가능하다.(무조건 대상을 싹 새로 고친다.)
		//이 문제 때문에 모니터링이 재대로 안될 수 있다.
		//그래서 domHtml의 textnode는 관리하지 안는다.
		//
		//하위 노드들도 이 문제로 인해 textnode에 감시대상과 태그가 뒤섞여있으면
		//동작하지 않을 가능성이 있다.
		//예> <div>{{TestText}}<h1>Title</h1></div>
		// => <div>TestText</div>
		//이 경우 {{TestText}}도 감싸주지 않으면 동작을 보장하지 못한다.
		//
		//그러니 한 태그의 내용물에 감시대상이 있으면 다른 내용은 같이 넣으면 안된다.
		//(단순 택스트는 가능)
		//단, 감시대상을 여러개 넣는건 가능하다.
		//예> <div>{{TestText}} {{TestHtml}}</div>
		//이 경우 textnode는 초기화 되고 노드의 내용물이 재생성 된다.
		//이 로인해서 연결되있던 포인터가 깨질 수 있으니 주의가 필요하다.

		//arrElemAll.unshift(domHtml);
		//읽기전용인 .childNodes를 이용하여 노드를 복원할 수 있다.
		//싹다 날리고 백업해둔 .childNodes를 그대로 하나하나 생성하면 가능

		//console.log(arrElemAll);
		console.log(domHtml.childNodes);

		
		for (let nDomElemIdx: number = 0; nDomElemIdx < arrElemAll.length; ++nDomElemIdx)
		{//엘리먼트 하나하나 검색

			//검사할 엘리먼트
			let itemElem: Element = arrElemAll[nDomElemIdx];
			
			//노드와 오버워치(감시자)가 일치하는 매치 리스트
			let arrMatch: MatchInterface[] = [];
			//매치 리스트를 만들고
			//매치 리스트에서 문자열만 있는지 여부를 판단한다.
			let bStringTargetIs
				= this.TextTargetIs(Array.from(itemElem.childNodes)
					, arrTarget, arrMatch);

			if (true === bStringTargetIs)
			{//문자열만 처리
				this.OverwatchText_TextOnly(arrMatch);
			}
			else
			{
				//한개라도 html옵션이 있다면
				this.OverwatchText_NewElement(itemElem, arrMatch);
			}

		}//end for nDomElemIdx
	}

	/**
	 *  엘리 먼트 내용물 처리 - 감시 대상이 텍스트만 있는 경우 
	 *  순수 텍스트는 Node로만 관리하는게 효율적이다.
	 * @param arrMatch
	 */
	private OverwatchText_TextOnly(arrMatch: MatchInterface[])
	{
		for (let nMatchIdx = 0
			; nMatchIdx < arrMatch.length
			; ++nMatchIdx)
		{
			let itemMatch: MatchInterface = arrMatch[nMatchIdx];

			if (null === itemMatch.Overwatch)
			{//감시자가 없으면 별도의 처리를 하지 않는다.
				continue;
			}

			if (true === itemMatch.Overwatch.OverwatchingOneIs
				&& true === itemMatch.Overwatch.OneDataIs)
			{//한개만 감시하는 옵션인데
				//이미 데이터가 한개이상 감시중이다.

				//추가작업은 패스 한다.
			}
			else
			{
				//텍스트는 node로만 처리된다.
				switch (itemMatch.Overwatch.OverwatchingType)
				{
					case OverwatchingType.Output_String:
						{
							itemMatch.Overwatch.OneDataIs = true;
							itemMatch.Node.nodeValue
								= itemMatch.Overwatch.data;
						}
						break;
					case OverwatchingType.Monitoring_String:
						{
							//한번이상 매칭됨
							itemMatch.Overwatch.OneDataIs = true;

							//대상 돔 추가
							itemMatch.Overwatch.Dom_Push_Node(itemMatch.Node);
							//첫 바딩딩 데이터 출력
							//elemTemp.innerHTML = itemOverwatch.data;
							//debugger;
							//elemTemp.insertAdjacentHTML("beforebegin", itemOverwatch.data);
							itemMatch.Overwatch.DataRefresh();
						}
						break;
				}
			}
		}
	}

	/**
	 * 엘리 먼트 내용물 처리 - 새로운 앨리먼트 생성
	 * 한개라도 html옵션이 있다면
	 * 1) 대상 노드의 내용물을 싹 백업하고
	 * 2) 대상 노드의 내용물을 싹 비운후
	 * 3) 하나하나 엘리먼트로 생성하여
	 * 4) 해당노드에 삽입한다.
	 * 기존에 찾아둔 dom개체는 동작하지 않을 수 있다.
	 * @param elemParents 처리할 노드를 가지고 있는 부모 개체
	 * @param arrMatch 매치된 정보가 들어있는 배열
	 */
	private OverwatchText_NewElement(
		elemParents: Element
		, arrMatch: MatchInterface[])
	{
		//내용물 비우기
		while (elemParents.firstChild)
		{
			elemParents.removeChild(elemParents.firstChild);
		}
		

		for (let nMatchIdx = 0
			; nMatchIdx < arrMatch.length
			; ++nMatchIdx)
		{
			let itemMatch: MatchInterface = arrMatch[nMatchIdx];

			//전체를 새로그려야한다
			

			if (null === itemMatch.Overwatch)
			{//감시자가 없다.

				//매칭정보가 없다면 일반 텍스트로 처리한다.
				//기본 데이터는 엘리먼트에있는걸 사용한다.

				elemParents.insertAdjacentText("beforeend", itemMatch.Node.textContent);
				//elemParents.insertAdjacentText("beforeend", arrTemp);
			}
			else
			{//대상 감시자가 있다.


				switch (itemMatch.Overwatch.OverwatchingType)
				{
					case OverwatchingType.Output_String://단순 출력
						elemParents.insertAdjacentText("beforeend", itemMatch.Overwatch.data);
						break;
					case OverwatchingType.Output_Html://단순 출력
						elemParents.insertAdjacentHTML("beforeend", itemMatch.Overwatch.data);
						break;

					case OverwatchingType.Monitoring_String://모니터링 텍스트
						//텍스트 개체를 만들고
						let newMString: Text = document.createTextNode(itemMatch.Overwatch.data);
						elemParents.appendChild(newMString);
						//elemParents.insertAdjacentText("beforeend", newMString);
						//추가한 노드를 찾고
						let findNode: Node = elemParents.childNodes
												.item(elemParents.childNodes.length - 1);
						//감시 돔리스트에 넣는다.
						itemMatch.Overwatch.Dom_Push_Node(findNode);
						break;

					case OverwatchingType.Monitoring_Html://모니터링 html
						//html 개체를 만들고
						let newMElem = document.createElement(this._ElementName);
						//내용물을 html 처리를 한 후
						newMElem.insertAdjacentHTML("beforeend", itemMatch.Overwatch.data);
						//개체에 추가
						elemParents.insertAdjacentElement("beforeend", newMElem);
						//감시 돔리스트에 넣는다.
						itemMatch.Overwatch.Dom_Push_Element(newMElem);
						break;
				}
				
			}

		}//end for nMatchIdx
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
	 * 지정된 전체 node리스트에서 연결된 오버워치를 묶어서 매칭시키고
	 * text노드의 경우 문자열만 감시하고 있는지 여부를 리턴한다.
	 * 매칭되는 정보가 없으면 Overwatch는 null이 된다.
	 * @param nodeAll 검사할 노드
	 * @param owTarget 매칭시킬 감시자 대상
	 * @param refMatch 결과 리스트 리턴
	 * @returns 문자열만 감시하고 있는지 여부. text노드가 아닌경우 true만 나오므로 주의해야 한다.
	 */
	private TextTargetIs(
		nodeAll: ChildNode[]
		, owTarget: Overwatch[]
		, refMatch: MatchInterface[])
		: boolean
	{
		//문자열만 있는지 여부
		let bOnlyString: boolean = true;

		for (let nNodeIdx = 0
			; nNodeIdx < nodeAll.length
			; ++nNodeIdx)
		{//노드 검색
			let itemNode: ChildNode = nodeAll[nNodeIdx];

			//이 노드에서 매칭된 정보가 하나라도 있는지 여부
			let bMatch: boolean = false;

			for (let nOverwatchIdx = 0
				; nOverwatchIdx < owTarget.length
				; ++nOverwatchIdx)
			{//감시자 검색
				let itemOW: Overwatch = owTarget[nOverwatchIdx];

				if (0 <= itemNode.textContent.indexOf(itemOW.NameFindString))
				{//있다.

					if (true == bOnlyString)
					{//아직 문자열만 나왔다.

						if (Node.TEXT_NODE === itemNode.nodeType)
						{//텍스트 노드이다.

							//엘리먼트의 내용물 중 Text만 추출
							//https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
							if (itemOW.OverwatchingType === OverwatchingType.Output_String
								|| itemOW.OverwatchingType === OverwatchingType.Monitoring_String)
							{//문자열 처리만 있다.
								bOnlyString = true;
							}
							else
							{//문자열 처리외에 다른게 있다.
								bOnlyString = false;
							}

						}
						else
						{//텍스트 노드가 아니다.
							bOnlyString = false;
						}
					}

					//매치 리스트에 추가
					refMatch.push({
						Node: itemNode
						, Overwatch: itemOW
					});

					bMatch = true;
				}
				else
				{
					
				}

			}//end for nOverwatchIdx


			if (false === bMatch)
			{
				//매치 리스트에 추가
				refMatch.push({
					Node: itemNode
					, Overwatch: null
				});
			}
		}//end for nNodeIdx


		return bOnlyString;
	}
}




/** 노드와 오버워치가 일치하는 매치 리스트 */
interface MatchInterface
{
	Node: HTMLElement | ChildNode
	, Overwatch: Overwatch | null
}