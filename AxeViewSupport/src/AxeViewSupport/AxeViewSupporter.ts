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

	/** 감시 대상 리스트 */
	public OverwatchList: Overwatch[] = [];
	 

	/**
	 * 
	 */
	constructor()
	{
	}

	public BindOverwatch(
		domParent: HTMLElement
		, arrOw: Overwatch[])
		: void
	{
		this.OverwatchList = arrOw;

		//가지고 있던 리스트 제거
		this.TemplateList = [];



		//템플릿 dom 찾기
		//1단계 자식만 찾는다.
		let arrTemplateDom: HTMLElement[]
			= Array.from(domParent.querySelectorAll(`:scope > [${FixString.AxeViewTemplate}]`));


		//찾은 dom 템플릿 개체로 만들기
		for (let i = 0; i < arrTemplateDom.length; ++i)
		{
			let itemTemp = new AxeViewTemplateModel(arrTemplateDom[i], true);
			this.TemplateList.push(itemTemp);

		}//end for i


		//정규식으로 검색하여 없는 이름을 감시대상 목록으로 만든다.
		//모든 엑스뷰 연결자 검색
		let regAxeViewConnect: RegExp
			= new RegExp(`\{\{[a-zA-Z0-9]+\}\}|\{\{[a-zA-Z0-9]+@.*\}\}`, 'g');

		//dom을 문자열로 바꾸고 액스뷰 연결자를 문자열 기준으로 찾는다.
		let arrAxeViewConnect: string[] = domParent.outerHTML.match(regAxeViewConnect);

		//추가할 감시대상 개체
		let arrOwAdd: Overwatch[] = [];

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
			let arrFind: Overwatch = this.OverwatchList.find(f => f.Name == sCut);

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
							OverwatchingOutputType: OverwatchingOutputType.Unidentified,
							OverwatchingType: OverwatchingType.Monitoring,
							OverwatchingOneIs: false
						}));
				}
			}
		}//end for i

		//지정되지 않은 감시대상 개체를 추가
		this.OverwatchList.push(...arrOwAdd);


		GlobalAxeViewSupport.AxeView.BindOverwatch(
			domParent
			, this.OverwatchList);


		if (1 == 1)
		{

		}
	}
	 
	
}

