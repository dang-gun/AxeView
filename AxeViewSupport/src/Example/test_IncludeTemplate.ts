
import AxeView
, {
	Overwatch
	, OverwatchInterface
	, OverwatchingOutputType
	, OverwatchingType
} from "../../../AxeView/src/AxeView/AxeView";

import AxeViewSupport
, {
} from "../AxeViewSupport/AxeViewSupporter"

import AxeViewTemplateModel from '../AxeViewSupport/AxeViewTemplateModel';

/** 
 * 포함된 템플릿 
 * 액스뷰 서포트 개체는 1개로 여러개의 돔을 관리해도된다.
 * 이 예제에서는 각 동작을 구분하기 쉬우려고 여러개로 분리했다.
 */
export default class test_IncludeTemplate
{
	/** 액스뷰 서포트 개체1 */
	private AxeViewSpt1: AxeViewSupport = new AxeViewSupport();

	/** 액스뷰 서포트 개체2 */
	private AxeViewSpt2: AxeViewSupport = new AxeViewSupport();

	
	constructor()
	{


		// #region dom으로 된 템플릿을 문자열(string)로 저장
		let listOw: Overwatch[] = [];

		listOw.push(new Overwatch({
			Name: "TestDom1_1"
			, FirstData: "<div>대기중....</div>"
			, OverwatchingOutputType: OverwatchingOutputType.Html
			, OverwatchingType: OverwatchingType.Monitoring
			, OverwatchingOneIs: true
		}));
		listOw.push(new Overwatch({
			Name: "TestDom1_2"
			, FirstData: ""
			, OverwatchingOutputType: OverwatchingOutputType.Dom
			, OverwatchingType: OverwatchingType.Monitoring
			, OverwatchingOneIs: true
		}));


		//대상 DOM
		let divAxeViewTset1: HTMLElement = document.getElementById("divAxeViewTset1");
		//돔에서 템플릿을 분리한다.
		this.AxeViewSpt1.TemplateBind(divAxeViewTset1, true);
		//감시 대상을 바인딩 한다.
		this.AxeViewSpt1.BindOverwatch(divAxeViewTset1, listOw);



		console.log("Template count : " + this.AxeViewSpt1.TemplateList.length);

		console.log("-----------------------------------");
		for (let i = 0; i < this.AxeViewSpt1.TemplateList.length; ++i)
		{
			let item: AxeViewTemplateModel = this.AxeViewSpt1.TemplateList[i];
			console.log(`Name : ${item.Name}`);

		}//end for i
		console.log("-----------------------------------");


		//템플릿을 복사하여 넣음
		(this.AxeViewSpt1.OverwatchObject.TestDom1_1 as Overwatch).data
			= (this.AxeViewSpt1.TemplateObject.template1 as AxeViewTemplateModel)
				.TemplateClone().content;


		(document.getElementById("btnTest1_2") as HTMLButtonElement).onclick
			= (event) =>
			{
				//감시대상에서 타겟 돔을 받아오고
				let domTarget: HTMLElement
					= ((this.AxeViewSpt1.OverwatchObject.TestDom1_2 as Overwatch)
						.data as HTMLElement);


				//템플릿을 추가할 개체 생성
				let domNew: HTMLDivElement = document.createElement("div");
				domNew.appendChild(
					(this.AxeViewSpt1.TemplateObject.template1 as AxeViewTemplateModel)
						.TemplateClone().content);

				domTarget.appendChild(domNew);

			};

		// #endregion



		// #region 문자열로 된 템플릿을 DOM으로 저장

		let listOw2: Overwatch[] = [];

		listOw2.push(new Overwatch({
			Name: "TestDom2_1"
			, FirstData: "<div>대기중....</div>"
			, OverwatchingOutputType: OverwatchingOutputType.Html
			, OverwatchingType: OverwatchingType.Monitoring
			, OverwatchingOneIs: true
		}));
		listOw2.push(new Overwatch({
			Name: "TestDom2_2"
			, FirstData: ""
			, OverwatchingOutputType: OverwatchingOutputType.Dom
			, OverwatchingType: OverwatchingType.Monitoring
			, OverwatchingOneIs: true
		}));


		//대상 DOM
		let divAxeViewTset2: HTMLElement = document.getElementById("divAxeViewTset2");
		//감시 대상을 바인딩 한다.
		this.AxeViewSpt2.BindOverwatch(divAxeViewTset2, listOw2);


		//수동으로 템플릿을 추가한다.
		this.AxeViewSpt2.TemplateAdd(
			"template2"
			, "코드로 추가한 템플릿<div>여기는 템플릿2 입니다.</div>"
			, false
		);

		//템플릿을 복사하여 넣음
		(this.AxeViewSpt2.OverwatchObject.TestDom2_1 as Overwatch).data
			= (this.AxeViewSpt2.TemplateObject.template2 as AxeViewTemplateModel)
				.TemplateClone().content;


		(document.getElementById("btnTest2_2") as HTMLButtonElement).onclick
			= (event) =>
			{
				//감시대상에서 타겟 돔을 받아오고
				let domTarget: HTMLElement
					= ((this.AxeViewSpt2.OverwatchObject.TestDom2_2 as Overwatch)
						.data as HTMLElement);


				//템플릿을 추가할 개체 생성
				let domNew: HTMLDivElement = document.createElement("div");
				domNew.appendChild(
					(this.AxeViewSpt2.TemplateObject.template2 as AxeViewTemplateModel)
						.TemplateClone().content);

				domTarget.appendChild(domNew);

			};

		// #endregion

		
	}


}
