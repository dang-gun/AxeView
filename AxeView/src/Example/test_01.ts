

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
	/** 감시자 리스트에서 동일한 이름의 감시자를 찾는다. */
	private FindOw(sNameOw: string)
		: Overwatch
	{
		return this.arrTarget.find(f => f.Name == sNameOw);
	}

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


		this.arrTarget.push(
			new Overwatch({
				Name: "funcStringTo"
				, FirstData: () =>
				{
					this.arrTarget[0].OutputTypeChange_All(OverwatchingOutputType.String);
					this.arrTarget[0].data = "<h3>문자열로 변환됨</h3>"
				}
				, OverwatchingOutputType: OverwatchingOutputType.Function_NameRemoveOn
				, OverwatchingType: OverwatchingType.OutputFirst
				, OverwatchingOneIs: false
			}));

		this.arrTarget.push(
			new Overwatch({
				Name: "funcHtmlTo"
				, FirstData: () =>
				{
					this.arrTarget[0].OutputTypeChange_All(OverwatchingOutputType.Html);
					this.arrTarget[0].data = "<h3>html로 변환됨</h3>";
				}
				, OverwatchingOutputType: OverwatchingOutputType.Function_NameRemoveOn
				, OverwatchingType: OverwatchingType.OutputFirst
				, OverwatchingOneIs: false
			}));

		this.arrTarget.push(
			new Overwatch({
				Name: "funcDomTo"
				, FirstData: () =>
				{
					this.arrTarget[0].OutputTypeChange_All(OverwatchingOutputType.Dom);

					//html 개체를 만들고
					let newMElem: HTMLElement = document.createElement("template");
					//내용물을 html 처리를 한 후
					newMElem.insertAdjacentHTML(
						"beforeend"
						, `<h3>Dom으로 변환됨</h3>`);
					this.arrTarget[0].data = newMElem.firstChild;
				}
				, OverwatchingOutputType: OverwatchingOutputType.Function_NameRemoveOn
				, OverwatchingType: OverwatchingType.OutputFirst
				, OverwatchingOneIs: false
			}));


		// #region 테스트 UI 연결 감시자

		this.arrTarget.push(
			new Overwatch({
				Name: "txtInput1"
				, FirstData: "테스트 데이터 입력1"
				, OverwatchingOutputType: OverwatchingOutputType.String
				, OverwatchingType: OverwatchingType.Monitoring_AttrValue_Input
				, OverwatchingOneIs: true
			}));

		
		this.arrTarget.push(
			new Overwatch({
				Name: "funcStringSet"
				, FirstData: () =>
				{
					let sData: string = this.FindOw("txtInput1").data;
					this.arrTarget[0].data = `${sData}`;
				}
				, OverwatchingOutputType: OverwatchingOutputType.Function_NameRemoveOn
				, OverwatchingType: OverwatchingType.OutputFirst
				, OverwatchingOneIs: false
			}));

		this.arrTarget.push(
			new Overwatch({
				Name: "funcHtmlSet"
				, FirstData: () =>
				{
					let sData: string = this.FindOw("txtInput1").data;
					this.arrTarget[0].data = `<h3>${sData}</h3>`;
				}
				, OverwatchingOutputType: OverwatchingOutputType.Function_NameRemoveOn
				, OverwatchingType: OverwatchingType.OutputFirst
				, OverwatchingOneIs: false
			}));

		this.arrTarget.push(
			new Overwatch({
				Name: "funcDomSet"
				, FirstData: () =>
				{
					let sData: string = this.FindOw("txtInput1").data;
					let newMElem: HTMLElement = document.createElement("template");
					newMElem.insertAdjacentHTML("beforeend", `<h3>${sData}</h3>`);
					this.arrTarget[0].data = newMElem.firstChild;
				}
				, OverwatchingOutputType: OverwatchingOutputType.Function_NameRemoveOn
				, OverwatchingType: OverwatchingType.OutputFirst
				, OverwatchingOneIs: false
			}));

		// #endregion
			

		//돔 재생성 및 설정된 뷰모델 연결
		this.AxeView.BindOverwatch(
			document.getElementById("divAxeViewTset1")
			, this.arrTarget);


		//this.arrTarget[0].data = "첫 바인딩 문자열2";
		
		
		

	}
	


}
