import { OverwatchList } from "../index";

import AxeView, {
	Overwatch
	, OverwatchInterface
	, OverwatchingOutputType
	, OverwatchingType
} from "../AxeView/AxeView";



export default class test_OutputTypeChange
{
	/** 액스뷰 개체 */
	private AxeView: AxeView = new AxeView();

	/** AxeView 테스트1 용 변수 */
	private Ow1List: OverwatchList = new OverwatchList();
	/** AxeView 테스트1 용 - 예제와 상관없는 감시자 */
	private Ow1_OtherList: OverwatchList = new OverwatchList();
	

	constructor()
	{

		//주석 제거
		this.AxeView.CommentDelete = false;



		//☆☆☆☆☆☆☆☆☆☆☆☆☆☆
		// 1) 노드 변경
		//☆☆☆☆☆☆☆☆☆☆☆☆☆☆

		this.Ow1List.OwList.push(
			new Overwatch({
				Name: "Node1Change"
				, FirstData: "첫 바인딩 문자열"
				, OverwatchingOutputType: OverwatchingOutputType.String
				, OverwatchingType: OverwatchingType.Monitoring
				, OverwatchingOneIs: false
			}));

		// #region 기능 테스트 감시자 - 1) 노드 변경

		this.Ow1_OtherList.OwList.push(
			new Overwatch({
				Name: "Node1Change_ToString"
				, FirstData: () =>
				{
					let owTarget: Overwatch = this.Ow1List.FindName("Node1Change");
					owTarget.OutputTypeChange_All(OverwatchingOutputType.String);
					owTarget.data = "<h3>문자열로 변환됨</h3>"
				}
				, OverwatchingOutputType: OverwatchingOutputType.Function_NameRemoveOn
				, OverwatchingType: OverwatchingType.OutputFirst
				, OverwatchingOneIs: false
			}));

		this.Ow1_OtherList.OwList.push(
			new Overwatch({
				Name: "Node1Change_ToHtml"
				, FirstData: () =>
				{
					let owTarget: Overwatch = this.Ow1List.FindName("Node1Change");
					owTarget.OutputTypeChange_All(OverwatchingOutputType.Html);
					owTarget.data = "<h3>html로 변환됨</h3>";
				}
				, OverwatchingOutputType: OverwatchingOutputType.Function_NameRemoveOn
				, OverwatchingType: OverwatchingType.OutputFirst
				, OverwatchingOneIs: false
			}));

		this.Ow1_OtherList.OwList.push(
			new Overwatch({
				Name: "Node1Change_ToDom"
				, FirstData: () =>
				{
					let owTarget: Overwatch = this.Ow1List.FindName("Node1Change");
					owTarget.OutputTypeChange_All(OverwatchingOutputType.Dom);

					//html 개체를 만들고
					let newMElem: HTMLElement = document.createElement("template");
					//내용물을 html 처리를 한 후
					newMElem.insertAdjacentHTML(
						"beforeend"
						, `<h3>Dom으로 변환됨</h3>`);
					owTarget.data = newMElem.firstChild;
				}
				, OverwatchingOutputType: OverwatchingOutputType.Function_NameRemoveOn
				, OverwatchingType: OverwatchingType.OutputFirst
				, OverwatchingOneIs: false
			}));

		// #endregion

		// #region 기능 테스트 UI 감시자

		this.Ow1_OtherList.OwList.push(
			new Overwatch({
				Name: "Node1Change_Input1"
				, FirstData: "테스트 데이터 입력1"
				, OverwatchingOutputType: OverwatchingOutputType.String
				, OverwatchingType: OverwatchingType.Monitoring_AttrValue_Input
				, OverwatchingOneIs: true
			}));


		this.Ow1_OtherList.OwList.push(
			new Overwatch({
				Name: "Node1Change_StringSet"
				, FirstData: () =>
				{
					let sData: string = this.Ow1_OtherList.FindName("Node1Change_Input1").data;
					this.Ow1List.FindName("Node1Change").data = `${sData}`;

				}
				, OverwatchingOutputType: OverwatchingOutputType.Function_NameRemoveOn
				, OverwatchingType: OverwatchingType.OutputFirst
				, OverwatchingOneIs: false
			}));

		this.Ow1_OtherList.OwList.push(
			new Overwatch({
				Name: "Node1Change_HtmlSet"
				, FirstData: () =>
				{
					let sData: string = this.Ow1_OtherList.FindName("Node1Change_Input1").data;
					this.Ow1List.FindName("Node1Change").data = `<h3>${sData}</h3>`;
				}
				, OverwatchingOutputType: OverwatchingOutputType.Function_NameRemoveOn
				, OverwatchingType: OverwatchingType.OutputFirst
				, OverwatchingOneIs: false
			}));

		this.Ow1_OtherList.OwList.push(
			new Overwatch({
				Name: "Node1Change_DomSet"
				, FirstData: () =>
				{
					let sData: string = this.Ow1_OtherList.FindName("Node1Change_Input1").data;

					let newMElem: HTMLElement = document.createElement("template");
					newMElem.insertAdjacentHTML("beforeend", `<h3>${sData}</h3>`);
					this.Ow1List.FindName("Node1Change").data = newMElem.firstChild;
				}
				, OverwatchingOutputType: OverwatchingOutputType.Function_NameRemoveOn
				, OverwatchingType: OverwatchingType.OutputFirst
				, OverwatchingOneIs: false
			}));

		// #endregion


		//돔 재생성 및 설정된 뷰모델 연결
		this.AxeView.BindOverwatch(
			document.getElementById("divAxeViewTset1")
			, this.Ow1List.OwList.concat(this.Ow1_OtherList.OwList));


		//this.arrTarget[0].data = "첫 바인딩 문자열2";




	}

}

