

import AxeView, { Overwatch, OverwatchInterface, OverwatchingOutputType, OverwatchingType } from "../AxeView/AxeView";



export default class test_01
{
	/** 액스뷰 개체 */
	private AxeView: AxeView = new AxeView();

	/** AxeView 테스트용 변수 */
	private arrTarget: Overwatch[] = [];

	/** AxeView 테스트용 변수3 */
	private arrTarget3: Overwatch[] = [];

	/** 돔개체 테스트용 */
	public domNew: HTMLElement = document.createElement("div");

	constructor()
	{
		//주석 제거
		this.AxeView.CommentDelete = false;

		this.domNew.innerHTML = "<h5>추가됐습니다.</h5>";

		this.arrTarget.push(
			//돔 찾기
			new Overwatch({
				Name: "HtmlDom"
				, FirstData: this.domNew
				, OverwatchingOutputType: OverwatchingOutputType.Dom
				, OverwatchingType: OverwatchingType.Monitoring
				, OverwatchingOneIs: true
			}));

		this.arrTarget.push(this.AxeView.New_OutputString("HtmlDomOpt", "없음"));

		this.arrTarget.push(
			//돔 찾기
			new Overwatch({
				Name: "HtmlDom2"
				, FirstData: document.createElement("div")
				, OverwatchingOutputType: OverwatchingOutputType.Dom
				, OverwatchingType: OverwatchingType.Monitoring
				, OverwatchingOneIs: true
				, TossOption: JSON.parse('{"coma":"false", "Message":"메시지 입니다."}')
			}));

		this.arrTarget.push(this.AxeView.New_MonitoringString("HtmlDom2Opt", "없음2"));


		//this.arrTarget.push(this.AxeView.New_MonitoringString("Money", "0"));


		//돔 재생성 및 설정된 뷰모델 연결
		this.AxeView.BindOverwatch(
			document.getElementById("divAxeViewTset")
			, this.arrTarget);

		this.arrTarget[1].data = JSON.stringify(this.arrTarget[0].TossOption);
		this.arrTarget[3].data = JSON.stringify(this.arrTarget[2].TossOption);

		document.getElementById("btnClick").onclick = this.TestCilck;
		document.getElementById("btnClick2").onclick = this.TestCilck2;


	}

	TestCilck = () =>
	{
		

		//let aaa: any = this.arrTarget[2].TossOptionFirst<TossTemp>() as TossT;


		
		console.log("to TossTemp : ");
		let tt1: TossTemp
			= this.arrTarget[2].TossOptionFirst<TossTemp>();
		console.log(tt1);
		console.log("msg : " + tt1.Message);

		console.log("to TossTemp2 : ");
		let tt2: TossTemp2
			= this.arrTarget[2].TossOptionFirst<TossTemp2>();
		console.log(tt2);
		console.log("msg : " + tt2.Message);

		console.log("to menu :");
		let tt3: { Message: string }
			= this.arrTarget[2].TossOptionFirst<{ Message: string }>();
		console.log(tt3);
		console.log("msg : " + tt3.Message);
	}

	TestCilck2 = () =>
	{
		this.TextInput();

		this.arrTarget[0].data = this.domNew;
	}

	private TextInput = () =>
	{
		let sTnput = (document.getElementById("txtInput") as HTMLInputElement).value;
		this.domNew.innerHTML = "<h5>" + sTnput + "</h5>";
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