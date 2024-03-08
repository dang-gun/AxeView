

import AxeView, { Overwatch, OverwatchInterface, OverwatchingOutputType, OverwatchingType } from "../AxeView/AxeView";



export default class test_Html
{
	/** 액스뷰 개체 */
	private AxeView: AxeView = new AxeView();	

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
		

		// #region 1) 자식 노드만 변경

		//자식 노드만 변경 ******************
		this.arrTarget1.push(
			new Overwatch({
				Name: "HtmlTest1_1"
				, FirstData: "<div>HTML div!!</div>"
				, OverwatchingOutputType: OverwatchingOutputType.Html
				, OverwatchingType: OverwatchingType.Monitoring
				, OverwatchingOneIs: false
			}));

		this.arrTarget1.push(
			new Overwatch({
				Name: "HtmlTest1_2"
				, FirstData: "<a href=''>HTML a!!</a>"
				, OverwatchingOutputType: OverwatchingOutputType.Html
				, OverwatchingType: OverwatchingType.Monitoring
				, OverwatchingOneIs: false
			}));

		this.arrTarget1.push(
			new Overwatch({
				Name: "HtmlTest1_3"
				, FirstData: ""
				, OverwatchingOutputType: OverwatchingOutputType.Html
				, OverwatchingType: OverwatchingType.Monitoring
				, OverwatchingOneIs: false
			}));

		//돔 재생성 및 설정된 뷰모델 연결
		this.AxeView.BindOverwatch(
			document.getElementById("divAxeViewTset1")
			, this.arrTarget1);


		//테스트 동작
		document.getElementById("btnHtmlTest1").onclick
			= (event) =>
			{
				let sTnput = (document.getElementById("txtHtmlTest1") as HTMLTextAreaElement).value;
				this.arrTarget1[0].data = sTnput;
				this.arrTarget1[1].data = sTnput;

				let divTemp = document.createElement("h2");
				divTemp.innerHTML = sTnput;
				this.arrTarget1[2].data = divTemp;
			}
		(document.getElementById("txtHtmlTest1") as HTMLTextAreaElement).value
			= "<div>추가 HTML string</div>"

		// #endregion




		// #region 2) 부모 교체

		this.arrTarget2.push(
			new Overwatch({
				Name: "HtmlTest2_1"
				, FirstData: "<div>HTML Dom Replace</div>"
				, OverwatchingOutputType: OverwatchingOutputType.Html
				, OverwatchingType: OverwatchingType.Monitoring
				, OverwatchingOneIs: false
			}));

		//돔 재생성 및 설정된 뷰모델 연결
		this.AxeView.BindOverwatch(
			document.getElementById("divAxeViewTset2")
			, this.arrTarget2);


		//테스트 동작
		document.getElementById("btnHtmlTest2_1").onclick
			= (event) =>
			{
				let sTnput = (document.getElementById("txtHtmlTest2") as HTMLTextAreaElement).value;
				//this.arrTarget1[1].data = "<a href=''>" + sTnput + "</a>";
				this.arrTarget2[0].DomReplace("<div>" + sTnput + "(div)</div>");
			};
		document.getElementById("btnHtmlTest2_2").onclick
			= (event) =>
			{
				let sTnput = (document.getElementById("txtHtmlTest2") as HTMLTextAreaElement).value;
				this.arrTarget2[0].DomReplace("<a href=''>" + sTnput + "(a)</a>");
			};
		document.getElementById("btnHtmlTest2_3").onclick
			= (event) =>
			{
				let sTnput = (document.getElementById("txtHtmlTest2") as HTMLTextAreaElement).value;
				this.arrTarget2[0].DomReplace("<h2>" + sTnput + "(h2)</h2>");
			};
		(document.getElementById("txtHtmlTest2") as HTMLTextAreaElement).value
			= "변환 HTML";

		// #endregion




		// #region 3) FirstData를 HTMLElement로 전달하기

		let domTemp3: HTMLDivElement = document.createElement("div");
		domTemp3.innerHTML = "코드에서 작성한 돔입니다.<div>내용 입니다~</div>";


		this.arrTarget3.push(
			new Overwatch({
				Name: "HtmlTest3_1"
				, FirstData: domTemp3
				, OverwatchingOutputType: OverwatchingOutputType.Html
				, OverwatchingType: OverwatchingType.Monitoring
				, OverwatchingOneIs: false
			}));

		//돔 재생성 및 설정된 뷰모델 연결
		this.AxeView.BindOverwatch(
			document.getElementById("divAxeViewTset3")
			, this.arrTarget3);


		//테스트 동작
		document.getElementById("btnHtmlTest3").onclick
			= (event) =>
			{
				let sTnput = (document.getElementById("txtHtmlTest3") as HTMLTextAreaElement).value;
				this.arrTarget3[0].data = sTnput;
			}
		(document.getElementById("txtHtmlTest3") as HTMLTextAreaElement).value
			= "<div>추가 HTML string</div>"
		// #endregion
	}
}
