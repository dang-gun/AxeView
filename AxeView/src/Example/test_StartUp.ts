

import AxeView, { Overwatch, OverwatchInterface, OverwatchingOutputType, OverwatchingType } from "../AxeView/AxeView";



export default class test_StartUp
{
	/** 액스뷰 개체 */
	private AxeView: AxeView = new AxeView();

	/** AxeView 테스트용 변수0 */
	private arrTarget0: Overwatch[] = [];

	/** AxeView 테스트용 변수1 */
	private arrTarget1: Overwatch[] = [];

	/** AxeView 테스트용 변수2 */
	private arrTarget2: Overwatch[] = [];

	/** AxeView 테스트용 변수3 */
	private arrTarget3: Overwatch[] = [];

	constructor()
	{
		//주석 제거
		this.AxeView.CommentDelete = true;


		//액스뷰0 테스트 ******************
		this.arrTarget0.push(
			this.AxeView.New_MonitoringString("StringTest1", "")
		);

		this.arrTarget0.push(
			this.AxeView.New_MonitoringString("CssTest1", "AxeCss")
		);

		this.arrTarget0.push(

			//모니터링 문자열 검색
			new Overwatch({
				Name: "RadioChange"
				, FirstData: (
					event: Event
					, sender: ChildNode
					, objThis: Overwatch) =>
				{
					let radio: HTMLInputElement = event.target as HTMLInputElement;

					switch (radio.value)
					{
						case "1"://R
							this.arrTarget0[0].data
								= "background-color: #ff0000;"
							this.arrTarget0[1].data
								= "background-color: #ff0000;"
							break;
						case "2"://G
							this.arrTarget0[0].data
								= "background-color: #00ff00;"
							this.arrTarget0[1].data
								= "background-color: #00ff00;"
							break;
						case "3"://B
							this.arrTarget0[0].data
								= "background-color: #0000ff;"
							this.arrTarget0[1].data
								= "background-color: #0000ff;"
							break;
					}

				}
				, OverwatchingOutputType: OverwatchingOutputType.Function_NameRemoveOn
				, OverwatchingType: OverwatchingType.Monitoring
				, OverwatchingOneIs: false
			}));

		//엑스뷰1
		//돔 재생성 및 설정된 뷰모델 연결
		this.AxeView.BindOverwatch(
			document.getElementById("divAxeViewTset0")
			, this.arrTarget0);




		//액스뷰1 테스트 ******************
		this.arrTarget1.push(
			//단순 문자열 출력
			new Overwatch({
				Name: "StringTest1"
				, FirstData: "문자열 출력!!"
				, OverwatchingOutputType: OverwatchingOutputType.String
				, OverwatchingType: OverwatchingType.OutputFirst
				, OverwatchingOneIs: true
			}));

		this.arrTarget1.push(
			//모니터링 문자열
			new Overwatch({
				Name: "StringTest2"
				, FirstData: "모니터링중(문자열)"
				, OverwatchingOutputType: OverwatchingOutputType.String
				, OverwatchingType: OverwatchingType.Monitoring
				, OverwatchingOneIs: false
			}));

		//엑스뷰1
		//돔 재생성 및 설정된 뷰모델 연결
		this.AxeView.BindOverwatch(
			document.getElementById("divAxeViewTset1")
			, this.arrTarget1);

		//이벤트 연결
		document.getElementById("btnStringTest1").onclick
			= (event) =>
			{
				let sTnput = (document.getElementById("txtInputStringTest1") as HTMLInputElement).value;

				this.arrTarget1[0].data = sTnput;
				this.arrTarget1[1].data = sTnput;
			}



		//액스뷰2 테스트 ******************
		this.arrTarget2.push(
			//단순 문자열 검색
			new Overwatch({
				Name: "HtmlTest1"
				, FirstData: "<div>HTML div!!</div>"
				, OverwatchingOutputType: OverwatchingOutputType.Html
				, OverwatchingType: OverwatchingType.Monitoring
				, OverwatchingOneIs: false
			}));

		this.arrTarget2.push(
			//모니터링 문자열 검색
			new Overwatch({
				Name: "HtmlTest2"
				, FirstData: "<a href=''>HTML a!!</a>"
				, OverwatchingOutputType: OverwatchingOutputType.Html
				, OverwatchingType: OverwatchingType.Monitoring
				, OverwatchingOneIs: false
			}));

		//엑스뷰2
		//돔 재생성 및 설정된 뷰모델 연결
		this.AxeView.BindOverwatch(
			document.getElementById("divAxeViewTset2")
			, this.arrTarget2);

		document.getElementById("btnHtmlTest1").onclick
			= (event) =>
			{
				let sTnput = (document.getElementById("txtHtmlTest1") as HTMLTextAreaElement).value;

				this.arrTarget2[0].data = "<div>" + sTnput + "</div>";
				this.arrTarget2[1].data = "<a href=''>" + sTnput + "</a>";
			}
		(document.getElementById("txtHtmlTest1") as HTMLTextAreaElement).value
			= "<div>기본 div</div>"



		//액스뷰3 테스트 ******************
		this.arrTarget3.push(
			//단순 문자열 검색
			new Overwatch({
				Name: "InputMonitoringTest1"
				, FirstData: "첫 데이터1"
				, OverwatchingOutputType: OverwatchingOutputType.String
				, OverwatchingType: OverwatchingType.Monitoring_AttrValue_Input
				, OverwatchingOneIs: false
			}));

		this.arrTarget3.push(
			//단순 문자열 검색
			new Overwatch({
				Name: "InputMonitoringTest2"
				, FirstData: "첫 데이터2"
				, OverwatchingOutputType: OverwatchingOutputType.String
				, OverwatchingType: OverwatchingType.Monitoring_AttrValue
				, OverwatchingOneIs: false
			}));

		this.arrTarget3.push(
			//모니터링 문자열 검색
			new Overwatch({
				Name: "InputMonitoringTest3"
				, FirstData: "모니터링중(문자열)1"
				, OverwatchingOutputType: OverwatchingOutputType.String
				, OverwatchingType: OverwatchingType.Monitoring
				, OverwatchingOneIs: false
			}));

		this.arrTarget3.push(
			//모니터링 문자열 검색
			new Overwatch({
				Name: "InputMonitoringTest4"
				, FirstData: "모니터링중(문자열)2"
				, OverwatchingOutputType: OverwatchingOutputType.String
				, OverwatchingType: OverwatchingType.Monitoring
				, OverwatchingOneIs: false
			}));


		//액스뷰3
		//돔 재생성 및 설정된 뷰모델 연결
		this.AxeView.BindOverwatch(
			document.getElementById("divAxeViewTset3")
			, this.arrTarget3);

		//첫번째 감시대상의 입력값을 실시간으로 받아온다.
		(this.arrTarget3[0].Dom as Node)
			.addEventListener("input", (event) =>
			{
				this.arrTarget3[1].data = this.arrTarget3[0].data;
				this.arrTarget3[2].data = this.arrTarget3[0].data;
			});

		//이벤트 연결
		document.getElementById("btnInputMonitoringTest1").onclick
			= (event) =>
			{
				this.arrTarget3[3].data = this.arrTarget3[1].data;
			}


	}
}
