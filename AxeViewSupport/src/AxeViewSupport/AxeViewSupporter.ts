﻿//AxeView.njsproj 프로젝트를 상대경로로 참조
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
			= new RegExp(`\{\{(.*?)\}\}`, 'g');

		//dom을 문자열로 바꾸고 액스뷰 연결자를 문자열 기준으로 찾는다.
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


		

		// 사용 예
		//const [getCount, setCount] = this.createState(0);

		//console.log(getCount(0)); // 0
		//setCount(5);
		//console.log(getCount(0)); // 5

		//const myFirstName = 'John';
		
		//console.log(Object.keys({ myFirstName })[0]);

		//let aaa = this.Data;
	}
	 

	public createState(initialValue)
	{
		let _val = initialValue; // 상태를 저장할 변수

		return [
			() => _val, // 상태를 가져오는 함수
			(newValue) => { _val = newValue; } // 상태를 변경하는 함수
		];
	}

	private dataTemp: String = "";

	public set Data(sData: String)
	{
		this.dataTemp = sData;
	}

	public get Data()
	{
		let objThis: AxeViewSupport = this;

		let temp = this.dataTemp;

		console.log(Object.keys({ temp })[0]);
		return this.dataTemp;
	}
	

}
