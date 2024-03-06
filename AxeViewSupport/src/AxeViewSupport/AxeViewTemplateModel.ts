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
	 * Axe View Template을 세팅한다.
	 * 전달된 Element의 자식만 템플릿으로 사용된다.
	 * @param domParent 템플릿으로 사용할 자식이 들어있는 부모 개체
	 * @param bStringTemplate 템플릿을 문자열로 저장할지 여부. 한번만 쓰거나 자주쓰지 않는다면 문자열로 저장하는 것이 효율이 더 좋다.
	 * @param bParenAttrRemove 부모의 템플릿을 지정하는 속성을 제거할지 여부  
	 */
	constructor(
		domParent: Element
		, bStringTemplate: boolean
		, bParenAttrRemove: boolean)
	{

		this.StringTemplateIs_Ori = bStringTemplate;

		if (true == this.StringTemplateIs_Ori)
		{
			this.TemplateElem = domParent.innerHTML;
		}
		else
		{
			//템플릿을 저장할 엘리먼트 생성
			this.TemplateElem = document.createElement("template");

			//모든 자식을 옮긴다.
			while (domParent.firstChild)
			{
				this.TemplateElem.appendChild(domParent.firstChild);
			}

			if (true == bParenAttrRemove)
			{//부모의 템플릿 속성 제거
				this.TemplateElem.removeAttribute(FixString.AxeViewTemplate);
			}
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

