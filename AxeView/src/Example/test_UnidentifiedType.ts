

import AxeView, {
	Overwatch
	, OverwatchInterface
	, OverwatchingOutputType
	, OverwatchingType
} from "../AxeView/AxeView";



export default class test_UnidentifiedType
{
	/** 액스뷰 개체 */
	private AxeView: AxeView = new AxeView();

	/** AxeView 테스트용 변수1 */
	private arrTarget1: Overwatch[] = [];
	/** 감시자1 리스트에서 동일한 이름의 감시자를 찾는다. */
	private FindOw1(sNameOw: string)
		: Overwatch
	{
		return this.arrTarget1.find(f => f.Name == sNameOw);
	}


	/** 예제와 상관없는 감시자 */
	private arrOther: Overwatch[] = [];
	/** 예제와 상관없는 감시자 리스트에서 동일한 이름의 감시자를 찾는다. */
	private FindOther(sNameOw: string)
		: Overwatch
	{
		return this.arrOther.find(f => f.Name == sNameOw);
	}

	constructor()
	{
		//주석 제거
		this.AxeView.CommentDelete = false;

		
		this.arrTarget1.push(
			new Overwatch({
				Name: "Test1"
				, FirstData: "첫 데이터"
				, OverwatchingOutputType: OverwatchingOutputType.Unidentified
				, OverwatchingType: OverwatchingType.Monitoring
				, OverwatchingOneIs: true
			}));

		// #region 예제와 상관없는 감시자 - 텍스트 노드 감시

		this.arrOther.push(
			new Overwatch({
				Name: "txtInput1"
				, FirstData: "테스트 데이터 입력1"
				, OverwatchingOutputType: OverwatchingOutputType.String
				, OverwatchingType: OverwatchingType.Monitoring_AttrValue_Input
				, OverwatchingOneIs: true
			}));

		this.arrOther.push(
			new Overwatch({
				Name: "funcStringSet"
				, FirstData: () =>
				{
					let sData: string = this.FindOther("txtInput1").data;
					this.FindOw1("Test1").data = `${sData}`;
				}
				, OverwatchingOutputType: OverwatchingOutputType.Function_NameRemoveOn
				, OverwatchingType: OverwatchingType.OutputFirst
				, OverwatchingOneIs: false
			}));

		this.arrOther.push(
			new Overwatch({
				Name: "funcHtmlSet"
				, FirstData: () =>
				{
					let sData: string = this.FindOther("txtInput1").data;
					this.FindOw1("Test1").data = `<h3>${sData}</h3>`;
				}
				, OverwatchingOutputType: OverwatchingOutputType.Function_NameRemoveOn
				, OverwatchingType: OverwatchingType.OutputFirst
				, OverwatchingOneIs: false
			}));

		// #endregion




		this.arrTarget1.push(
			new Overwatch({
				Name: "CssTest_UnType"
				, FirstData: "bgRed"
				, OverwatchingOutputType: OverwatchingOutputType.Unidentified
				, OverwatchingType: OverwatchingType.Monitoring
				, OverwatchingOneIs: true
			}));

		this.arrTarget1.push(
			new Overwatch({
				Name: "CssTest_UnType"
				, FirstData: "bgRed"
				, OverwatchingOutputType: OverwatchingOutputType.Unidentified
				, OverwatchingType: OverwatchingType.Monitoring
				, OverwatchingOneIs: true
			}));

		// #region 예제와 상관없는 감시자 - 속성 감시

		// #endregion

		//돔 재생성 및 설정된 뷰모델 연결
		this.AxeView.BindOverwatch(
			document.getElementById("divAxeViewTset1")
			, this.arrTarget1.concat(this.arrOther));
			
	}

}


