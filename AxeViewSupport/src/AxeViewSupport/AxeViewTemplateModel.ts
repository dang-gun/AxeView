//AxeView.njsproj 프로젝트를 상대경로로 참조
import AxeView, {
	Overwatch
	, OverwatchInterface
	, OverwatchingOutputType
	, OverwatchingType
} from "../../../AxeView/src/AxeView/AxeView";

import FixString from './Global/GlobalAxeViewSupport_FixString';
import GlobalAxeViewSupport from './Global/GlobalAxeViewSupport';

/** 
 * Axe View Template 모델 
 * 
 */
export default class AxeViewTemplateModel
{
	/** 구분용 이름 - 원본*/
	private NameOri: string = "";
	/** 구분용 이름*/
	public get Name(): string
	{
		return this.NameOri;
	}
	/** 구분용 이름*/
	public set Name(value: string)
	{
		this.NameOri = value;
	}

	/** 가지고 있는 템플릿 엘리먼트 원본*/
	public TemplateElem: HTMLTemplateElement | string | null = null;

	/** 
	 * 템플릿을 문자열로 저장하고 있는지 여부 - 원본
	 * 한번만 쓰거나 자주쓰지 않는다면 문자열로 저장하는 것이 효율이 더 좋다.
	 */
	private StringTemplateIs_Ori: boolean = false;
	/** 템플릿을 문자열로 저장하고 있는지 여부*/
	public get StringTemplateIs(): boolean
	{
		return this.StringTemplateIs_Ori;
	}

	/**
	 * Axe View Template을 생성한다.
	 * @param sName 템플릿으로 사용할 이름.
	 * null이거나 빈값이면 지정되지 않는다.
	 */
	constructor(sName: string | null)
	{
		//이름 저장
		if (sName)
		{
			this.Name = sName;
		}
	}

	/**
	 * 사용할 Axe View Template을 세팅한다.
	 * 전달된 Element를 통체로 템플릿으로 사용된다.
	 * @param domParent 템플릿으로 사용할 개체. 
	 * 문자열을 템플릿으로 사용하고 싶다면 TemplateStringSet을 사용해야 한다.
	 * @param bStringTemplate 템플릿을 문자열로 저장할지 여부. 
	 * 한번만 쓰거나 자주쓰지 않는다면 문자열로 저장하는 것이 효율이 더 좋다.
	 * @param bParentRemove 템플릿으로 사용한 부모를 지울지 여부.
	 * 템플릿이 완성되면 템플릿으로 사용한 부모를 지운다.
	 * @param bParentAttrRemove 템플릿으로 사용한 부모의 템플릿관련 속성을 제거할지 여부.
	 * axeview-template을 비롯한 템플릿 관련 속성을 제거한다.
	 * @param bParentChildRemove 템플릿으로 부모의 자식을 제거할지 여부.
	 */
	public TemplateSet(
		domParent: Element
		, bStringTemplate: boolean
		, bParentRemove: boolean
		, bParentAttrRemove: boolean
		, bParentChildRemove: boolean)
	{
		
		this.StringTemplateIs_Ori = bStringTemplate;

		if (true == this.StringTemplateIs_Ori)
		{//문자열로 저장이고

			//자식의 내용만 문자열로 추출한다.
			this.TemplateElem = domParent.innerHTML;
		}
		else
		{
			//템플릿을 저장할 엘리먼트 생성
			this.TemplateElem = document.createElement("template");

			//모든 자식을 복사하여 옮긴다.
			while ((domParent as Element).firstChild)
			{
				this.TemplateElem.appendChild((domParent as Element).firstChild.cloneNode(true));
			}
		}


		if (true === bParentRemove)
		{//부모 제거

			domParent.remove();
		}
		else 
		{//부모가 제거되지 않았을 때


			if (true === bParentAttrRemove)
			{//부모의 템플릿 속성 제거
				domParent.removeAttribute(FixString.AxeViewTemplate);
				domParent.removeAttribute(FixString.AxeViewTemplate_ParentRemove);
				domParent.removeAttribute(FixString.AxeViewTemplate_ParentArrRemove);
				domParent.removeAttribute(FixString.AxeViewTemplate_ParentChildRemove);
			}

			if (true === bParentChildRemove)
			{//템플릿으로 부모의 자식을 제거

				domParent.innerHTML = "";
			}

		}

	}

	/**
	 * 문자열로 템플릿을 생성한다.
	 * @param sParent
	 * @param bStringTemplate
	 */
	public TemplateStringSet(
		sParent: string
		, bStringTemplate: boolean)
	{
		this.StringTemplateIs_Ori = bStringTemplate;


		if (true === this.StringTemplateIs_Ori)
		{//문자열로 저장이다.

			//들어온 문자열 그대로 저장
			this.TemplateElem = sParent;
		}
		else
		{//문자열 저장이 아니다.

			//템플릿을 저장할 엘리먼트 생성
			this.TemplateElem = document.createElement("template");
			//문자열을 html로 바인딩한다.
			this.TemplateElem.innerHTML = sParent;
		}
	}




	public TemplateClone(): HTMLTemplateElement
	{
		let returnTemplateElem: HTMLTemplateElement;

		if (true === this.StringTemplateIs_Ori)
		{//문자열로 저장되어 있는 경우

			returnTemplateElem = document.createElement("template");
			returnTemplateElem.innerHTML = this.TemplateElem as string;
		}
		else
		{//엘리먼트로 저장되어 있는 경우
			returnTemplateElem
				= (this.TemplateElem as HTMLTemplateElement)
					.cloneNode(true) as HTMLTemplateElement;
		}

		return returnTemplateElem;
	}

	public TemplateClone2(): Node
	{
		let returnTemplateElem: Node;

		if (true === this.StringTemplateIs_Ori)
		{//문자열로 저장되어 있는 경우

			let temp1: HTMLTemplateElement = document.createElement("template");
			temp1.innerHTML = this.TemplateElem as string;
			returnTemplateElem = temp1.content;
		}
		else
		{//엘리먼트로 저장되어 있는 경우

			let temp2: HTMLTemplateElement = (this.TemplateElem as HTMLTemplateElement);
			returnTemplateElem = temp2.content.cloneNode(true);
		}

		return returnTemplateElem;
	}
	
}

