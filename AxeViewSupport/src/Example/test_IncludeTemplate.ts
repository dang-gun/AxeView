
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

/** 포함된 템플릿 */
export default class test_IncludeTemplate
{
	/** 액스뷰 서포트 개체 */
	private AxeViewSpt: AxeViewSupport = new AxeViewSupport();

	
	constructor()
	{
		let listOw: Overwatch[] = [];

		/** 돔개체 테스트용 */
		let domNew: HTMLElement = document.createElement("div");
		domNew.innerHTML = "<h5>대기중....</h5>";

		listOw.push(new Overwatch({
			Name: "TestDom1_1"
			, FirstData: domNew
			, OverwatchingOutputType: OverwatchingOutputType.Html
			, OverwatchingType: OverwatchingType.Monitoring
			, OverwatchingOneIs: true
		}));
		listOw.push(new Overwatch({
			Name: "TestDom1_2"
			, FirstData: domNew
			, OverwatchingOutputType: OverwatchingOutputType.Html
			, OverwatchingType: OverwatchingType.Monitoring
			, OverwatchingOneIs: true
		}));


		//돔에서 템플릿을 분리한다.
		this.AxeViewSpt.BindOverwatch(
			document.getElementById("divAxeViewTset1")
			, listOw);

		console.log("Template count : " + this.AxeViewSpt.TemplateList.length);

		console.log("-----------------------------------");
		for (let i = 0; i < this.AxeViewSpt.TemplateList.length; ++i)
		{
			let item: AxeViewTemplateModel = this.AxeViewSpt.TemplateList[i];
			console.log(`Name : ${item.Name}`);

		}//end for i
		console.log("-----------------------------------");




		(this.AxeViewSpt.OverwatchObject.TestDom1_1 as Overwatch).data
			= (this.AxeViewSpt.TemplateObject.template1 as AxeViewTemplateModel)
				.TemplateClone().content;

		//(this.AxeViewSpt.OverwatchObject.TestDom1_1 as Overwatch).data
		//	= ((this.AxeViewSpt.TemplateObject.template1 as AxeViewTemplateModel)
		//		.TemplateElem as HTMLTemplateElement).cloneNode(true);

		let tempDiv: HTMLDivElement = document.createElement("div");
		tempDiv.innerHTML = "가나다라";

		(this.AxeViewSpt.OverwatchObject.TestDom1_2 as Overwatch).data = tempDiv;

		let temp1: AxeViewTemplateModel
			= this.AxeViewSpt.TemplateObject.template1 as AxeViewTemplateModel;

		let temp2: Node = temp1.TemplateClone2();


		let temp3: HTMLTemplateElement = document.createElement("template");
		temp3.innerHTML = "<div>임의 테스트</div>";
		
		//(document.getElementById("divTemp") as HTMLDivElement)
		//	.appendChild(temp3.content.cloneNode(true));
		(document.getElementById("divTemp") as HTMLDivElement)
			.appendChild(temp1.TemplateClone().content);






		//돔 재생성 및 설정된 뷰모델 연결
		//this.AxeView.BindOverwatch(
		//	document.getElementById("divAxeViewTset")
		//	, this.arrTarget);
	}


}
