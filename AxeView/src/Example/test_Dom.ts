

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

		//돔 재생성 및 설정된 뷰모델 연결
		this.AxeView.BindOverwatch(
			document.getElementById("divAxeViewTset")
			, this.arrTarget);



		document.getElementById("btnClick").onclick = this.TestCilck;
		document.getElementById("btnClick2").onclick = this.TestCilck2;






		//this.arrTarget3.push(
		//	//단순 문자열 검색
		//	new Overwatch({
		//		Name: "InputMonitoringTest1"
		//		, FirstData: "첫 데이터1"
		//		, OverwatchingOutputType: OverwatchingOutputType.String
		//		, OverwatchingType: OverwatchingType.Monitoring_AttrValue
		//		, OverwatchingOneIs: false
		//	}));

		//this.arrTarget3.push(
		//	//단순 문자열 검색
		//	new Overwatch({
		//		Name: "InputMonitoringTest2"
		//		, FirstData: "첫 데이터2"
		//		, OverwatchingOutputType: OverwatchingOutputType.String
		//		, OverwatchingType: OverwatchingType.Monitoring_AttrValue
		//		, OverwatchingOneIs: false
		//	}));

		//this.arrTarget3.push(
		//	//모니터링 문자열 검색
		//	new Overwatch({
		//		Name: "InputMonitoringTest3"
		//		, FirstData: "모니터링중(문자열)1"
		//		, OverwatchingOutputType: OverwatchingOutputType.String
		//		, OverwatchingType: OverwatchingType.Monitoring
		//		, OverwatchingOneIs: false
		//	}));

		//this.arrTarget3.push(
		//	//모니터링 문자열 검색
		//	new Overwatch({
		//		Name: "InputMonitoringTest4"
		//		, FirstData: "모니터링중(문자열)2"
		//		, OverwatchingOutputType: OverwatchingOutputType.String
		//		, OverwatchingType: OverwatchingType.Monitoring
		//		, OverwatchingOneIs: false
		//	}));


		////액스뷰3
		////돔 재생성 및 설정된 뷰모델 연결
		//this.AxeView.BindOverwatch(
		//	document.getElementById("divAxeViewTset3")
		//	, this.arrTarget3);
	}

	TestCilck = () =>
	{
		this.TextInput();

		let findTarget = document.querySelector("#divAxeViewTset > div");


		let findParent = document.querySelector("#divAxeViewTset");
		findParent.replaceChild(this.domNew, findTarget)
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
