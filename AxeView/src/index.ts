

import AxeView, { Overwatch, OverwatchInterface, OverwatchingType } from "./AxeView/AxeView";



export default class StartUp
{
	/** 엑스뷰 개체 */
	AxeView: AxeView = new AxeView();

	//AxeView 테스트용 변수
	arrTarget: Overwatch[] = [];

	constructor()
	{
		//엑스뷰 테스트****
		this.arrTarget.push(
			//단순 문자열 검색
			new Overwatch({
				Name: "StringTest"
				, Action: "문자열 출력!!"
				, OverwatchingType: OverwatchingType.Output_String
				, OverwatchingOneIs: true
			}));

		this.arrTarget.push(
			//단순 html 검색
			new Overwatch({
				Name: "HtmlTest"
				, Action: "<h3>Html 출력!</h3>"
				, OverwatchingType: OverwatchingType.Output_Html
				, OverwatchingOneIs: true
			}));

		this.arrTarget.push(
			//모니터링 문자열 검색
			new Overwatch({
				Name: "MonitoringString"
				, Action: "모니터링중 - 문자열"
				, OverwatchingType: OverwatchingType.Monitoring_String
				, OverwatchingOneIs: false
			}));

		this.arrTarget.push(
			//모니터링 문자열 검색
			new Overwatch({
				Name: "MonitoringHtml"
				, Action: "<h1>모니터링중Html</h1>"
				, OverwatchingType: OverwatchingType.Monitoring_Html
				, OverwatchingOneIs: false
			}));

		this.AxeView.HtmlToOverwatch(
			document.getElementById("divAxeViewTset")
			, this.arrTarget);


		document.getElementById("btnClick").onclick = this.TestCilck;
	}

	TestCilck = () =>
	{
		this.arrTarget[2].data = "클릭했다!!!";
		this.arrTarget[3].data = "<h2>클릭했다!!HTML</h2>";
	}
}


const app = new StartUp();
