

import AxeView
, {
	Overwatch
	, OverwatchInterface
	, OverwatchingOutputType
	, OverwatchingType
	, AxeViewDomInterface
} from "../AxeView/AxeView";


/** 테스트용 */
export default class test_01
{
	/** 액스뷰 개체 */
	private AxeView: AxeView = new AxeView();

	/** AxeView 테스트용 변수 */
	private arrTarget: Overwatch[] = [];

	constructor()
	{
		

		//주석 제거
		this.AxeView.CommentDelete = false;

		this.arrTarget.push(
			new Overwatch({
				Name: "Test1"
				, FirstData: "첫 바인딩 문자열"
				, OverwatchingOutputType: OverwatchingOutputType.String
				, OverwatchingType: OverwatchingType.Monitoring
				, OverwatchingOneIs: false
			}));

		this.arrTarget.push(
			new Overwatch({
				Name: "Test2"
				, FirstData: "<h3>첫 바인딩 문자열(html)</h3>"
				, OverwatchingOutputType: OverwatchingOutputType.Html
				, OverwatchingType: OverwatchingType.Monitoring
				, OverwatchingOneIs: false
			}));
			

		//돔 재생성 및 설정된 뷰모델 연결
		this.AxeView.BindOverwatch(
			document.getElementById("divAxeViewTset")
			, this.arrTarget);


		//this.arrTarget[0].data = "첫 바인딩 문자열2";

		//UI 연결
		document.getElementById("btnString").onclick = () =>
		{
			this.arrTarget[0].OutputTypeChange_All(OverwatchingOutputType.String);

			this.arrTarget[0].data = "<h1>문자열로 변환됨</h1>"
		}
		document.getElementById("btnHtml").onclick = () =>
		{
			
			this.arrTarget[0].OutputTypeChange_All(OverwatchingOutputType.Html);


			this.arrTarget[0].data = "<h1>html로 변환됨</h1>"
		}
	}


}
