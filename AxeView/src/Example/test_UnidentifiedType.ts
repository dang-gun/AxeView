

import AxeView, { Overwatch, OverwatchInterface, OverwatchingOutputType, OverwatchingType } from "../AxeView/AxeView";



export default class test_UnidentifiedType
{
	/** 액스뷰 개체 */
	private AxeView: AxeView = new AxeView();

	/** AxeView 테스트용 변수 */
	private arrTarget: Overwatch[] = [];


	constructor()
	{
		//주석 제거
		this.AxeView.CommentDelete = false;

		let domNew: HTMLElement = document.createElement("div");
		domNew.innerHTML = "<h5>돔1</h5>";

		this.arrTarget.push(
			//돔 찾기
			new Overwatch({
				Name: "HtmlDom"
				, FirstData: domNew
				, OverwatchingOutputType: OverwatchingOutputType.Dom
				, OverwatchingType: OverwatchingType.Monitoring
				, OverwatchingOneIs: true
			}));

		let domNew2: HTMLElement = document.createElement("div");
		domNew2.innerHTML = "<h5>돔2</h5>";

		this.arrTarget.push(
			//돔 찾기
			new Overwatch({
				Name: "HtmlDom2"
				, FirstData: domNew2
				, OverwatchingOutputType: OverwatchingOutputType.Dom
				, OverwatchingType: OverwatchingType.Monitoring
				, OverwatchingOneIs: true
				, TossOption: JSON.parse('{"coma":"false", "Message":"메시지 입니다."}')
			}));


		//돔 재생성 및 설정된 뷰모델 연결
		this.AxeView.BindOverwatch(
			document.getElementById("divAxeViewTset")
			, this.arrTarget);


		//적용된 옵션 화면에 표시하기
		(this.arrTarget[0].data as HTMLElement).innerHTML
			= "옵션 : " + JSON.stringify(this.arrTarget[0].TossOption);
		(this.arrTarget[1].data as HTMLElement).innerHTML
			= "옵션 : " + JSON.stringify(this.arrTarget[1].TossOption);




		console.log("to TossTemp : ");
		let tt1: TossTemp
			= this.arrTarget[1].TossOptionFirst<TossTemp>();
		console.log(tt1);
		console.log("msg : " + tt1.Message);

		console.log("to TossTemp2 : ");
		let tt2: TossTemp2
			= this.arrTarget[1].TossOptionFirst<TossTemp2>();
		console.log(tt2);
		console.log("msg : " + tt2.Message);

		console.log("to menu :");
		let tt3: { Message: string }
			= this.arrTarget[1].TossOptionFirst<{ Message: string }>();
		console.log(tt3);
		console.log("msg : " + tt3.Message);
	}

}



interface TossTemp
{
	Message: string
}


interface TossTemp2
{
	Message: string
	coma: string
}