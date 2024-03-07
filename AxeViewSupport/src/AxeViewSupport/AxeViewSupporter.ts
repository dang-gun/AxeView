//AxeView.njsproj 프로젝트를 상대경로로 참조
import AxeView, {
	Overwatch
	, OverwatchInterface
	, OverwatchingOutputType
	, OverwatchingType
	//} from "AxeViewRoot/AxeView";
} from "../../../AxeView/src/AxeView/AxeView";

import FixString from './Global/GlobalAxeViewSupport_FixString';
import GlobalAxeViewSupport from './Global/GlobalAxeViewSupport';

import AxeViewTemplateModel from './AxeViewTemplateModel';

/** AxeView 구현 */
export default class AxeViewSupport
{
	/** 읽어들인 템플릿 리스트 */
	public TemplateList: AxeViewTemplateModel[] = [];
	/** 
	 * 잘라둔 템플릿
	 * 템플릿의 원본 개체이므로 복사해서 사용하는 것이 좋다.
	 */
	public TemplateObject: any = {};

	/** 감시 대상 리스트 */
	public OverwatchList: Overwatch[] = [];
	/** 
	 * 감시 대상 직접 접근 개체 
	 * 
	 * 클래스 본문에 넣고 싶었지만 그렇게되면 타입에러가 나서 일단 이렇게 구현한다.
	 */
	public OverwatchObject: any = {};

	
	 

	public FindOverwatch(
		sName: string)
		: Overwatch | null
	{
		let findOW: Overwatch | null = null;


		return findOW;
	}
	

	/**
	 * 
	 */
	constructor()
	{
	}

	/**
	 * 문자열로된 템플릿을 추가한다.
	 * @param sName
	 * @param sTemplateString
	 * @param bStringTemplate 문자열로 저장할 여부
	 */
	public TemplateAdd(
		sName: string
		, sTemplateString: string
		, bStringTemplate: boolean)
		: void;

	/**
	* DOM으로된 템플릿을 추가한다.
	* @param sName
	* @param domTemplate
	* @param bStringTemplate 문자열로 저장할 여부
	*/
	public TemplateAdd(
		sName: string
		, domTemplate: HTMLElement
		, bStringTemplate: boolean)
		: void;

	/**
	 * 템플릿을 추가한다.
	 * @param sName
	 * @param objTemplate
	 * @param bStringTemplate 문자열로 저장할 여부
	 */
	public TemplateAdd(
		sName: string
		, objTemplate: string | HTMLElement
		, bStringTemplate: boolean)
		: void
	{

		//템플릿 개체 생성
		let itemTemp: AxeViewTemplateModel = new AxeViewTemplateModel(sName);

		if ("string" === typeof objTemplate)
		{//입력이 문자열이다.

			//문자열로 템플릿을 설정한다.
			itemTemp.TemplateStringSet(objTemplate as string, bStringTemplate);
		}
		else
		{
			//HTMLElement 취급한다.
			//HTMLElement 템플릿을 설정한다.
			itemTemp.TemplateElementSet(objTemplate as HTMLElement, bStringTemplate);
		}


		if (itemTemp.Name
			&& "" !== itemTemp.Name)
		{//지정된 이름이 있다.

			//바로 접근 할 수 있는 템플릿 개체 만들기
			this.TemplateObject[itemTemp.Name] = itemTemp;
		}
	}
	
	 


	/**
	 * 돔에서 액스뷰 템플릿 대상을 찾아 템플릿으로 변환한다.
	 * @param domParent
	 * @param bStringTemplate 문자열로 저장할 여부
	 */
	public TemplateBind(
		domParent: HTMLElement
		, bStringTemplate: boolean)
		: void
	{
		//템플릿 dom 찾기 *****
		//1단계 자식만 찾는다.
		let arrTemplateDom: HTMLElement[]
			= Array.from(domParent.querySelectorAll(`:scope > [${FixString.AxeViewTemplate}]`));


		//찾은 dom 템플릿 개체로 만들기
		for (let i = 0; i < arrTemplateDom.length; ++i)
		{
			let itemDom: HTMLElement = arrTemplateDom[i];

			//옵션 찾기 *****
			//템플릿으로 사용한 부모를 지울지 여부.
			let bParentRemove: boolean = false;
			if ("true" === this.AttributeValueGet(itemDom, FixString.AxeViewTemplate_ParentRemove).toLowerCase())
			{
				bParentRemove = true;
			}
			//템플릿으로 사용한 부모에서 템플릿 관련 속성을 지울지 여부
			let bParentArrRemove: boolean = false;
			if ("true" === this.AttributeValueGet(itemDom, FixString.AxeViewTemplate_ParentArrRemove).toLowerCase())
			{
				bParentArrRemove = true;
			}
			//템플릿으로 사용한 부모에서 자식을 모두 지울지 여부
			let bParentChildRemove: boolean = false;
			if ("true" === this.AttributeValueGet(itemDom, FixString.AxeViewTemplate_ParentChildRemove).toLowerCase())
			{
				bParentChildRemove = true;
			}


			//이름 먼저 추출
			//이름을 나중에 추출하면 속성제거 옵션때문에 빈값이 나올 수 있다.
			let sName: string = this.AttributeValueGet(itemDom, FixString.AxeViewTemplate);
			//템플릿 개체 생성
			let itemTemp: AxeViewTemplateModel = new AxeViewTemplateModel(sName);
			//템플릿 지정
			itemTemp.TemplateDomSet(
				itemDom
				, bStringTemplate
				, bParentRemove
				, bParentArrRemove
				, bParentChildRemove);


			//템플릿 리스트에 추가
			this.TemplateList.push(itemTemp);

			if (itemTemp.Name
				&& "" !== itemTemp.Name)
			{//지정된 이름이 있다.

				//바로 접근 할 수 있는 템플릿 개체 만들기
				this.TemplateObject[itemTemp.Name] = itemTemp;
			}
			
		}//end for i
	}

	/**
	 * 감시대상 개체를 바인딩 한다.
	 * 매칭 대상이 없으면 생성해 준다.
	 * @param domParent
	 * @param arrOw
	 */
	public BindOverwatch(
		domParent: HTMLElement
		, arrOw: Overwatch[])
		: void
	{
		this.OverwatchList = arrOw;

		

		//정규식으로 검색하여 없는 이름을 감시대상 목록으로 만든다.
		//모든 액스뷰 연결자 검색
		let regAxeViewConnect: RegExp
			= new RegExp(`\{\{(.*?)\}\}`, 'g');

		//dom을 문자열로 바꾸고 엑스뷰 연결자를 문자열 기준으로 찾는다.
		let arrAxeViewConnect: string[] = domParent.outerHTML.match(regAxeViewConnect);

		//추가할 감시대상 개체
		let arrOwAdd: Overwatch[] = [];

		if (null !== arrAxeViewConnect)
		{//검색 결과가 있다.

			for (let i = 0; i < arrAxeViewConnect.length; ++i)
			{
				let sItem: string = arrAxeViewConnect[i];

				//앞뒤 중괄호 두개를 자르고
				//@뒤에 있는 옵션을 제거한
				//순수 이름만 추출한다.
				let sCut: string
					= sItem.substring(2, sItem.length - 2)
						.split('@')[0];

				//일치하는 요소가 하나라도 있는지 확인
				let arrFind: Overwatch
					= this.OverwatchList
						.find(f => f.Name == sCut
								|| f.Name.toLowerCase() == sCut);

				if (!arrFind)
				{//없다.

					//추가 리스트에도 없는지 확인
					let arrFindAdd: Overwatch = arrOwAdd.find(f => f.Name == sCut);

					if (!arrFindAdd)
					{//없다.

						//새로운 감시대상을 만들어 추가
						arrOwAdd.push(
							new Overwatch({
								Name: sCut,
								FirstData: "",
								OverwatchingOutputType: OverwatchingOutputType.String,
								OverwatchingType: OverwatchingType.Unidentified,
								OverwatchingOneIs: false
							}));
					}
				}
			}//end for i
		}

		//지정되지 않은 감시대상 개체를 추가
		this.OverwatchList.push(...arrOwAdd);


		GlobalAxeViewSupport.AxeView.BindOverwatch(
			domParent
			, this.OverwatchList);

		//바로 접근 할 수 있는 개체 만들기
		for (let i = 0; i < arrOw.length; ++i)
		{
			let itemOw: Overwatch = arrOw[i];

			//this[itemOw.Name] = itemOw;
			this.OverwatchObject[itemOw.Name] = itemOw;

		}//end for i


		
	}//end BindOverwatch

	private AttributeValueGet(
		dom: HTMLElement
		, AttrName: string)
		: string
	{
		let sReturn: string = "";

		let sValue: string = dom.getAttribute(AttrName);
		if (null !== sValue)
		{
			sReturn = sValue;
		}

		return sReturn;
	}
}

