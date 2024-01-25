import { OverwatchList } from "../index";

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

	/** AxeView 테스트1 용 변수 */
	private Ow1List: OverwatchList = new OverwatchList();
	/** AxeView 테스트1 용 - 예제와 상관없는 감시자 */
	private Ow1_OtherList: OverwatchList = new OverwatchList();

	/** AxeView 테스트2 용 변수 */
	private Ow2List: OverwatchList = new OverwatchList();
	/** AxeView 테스트2 용 - 예제와 상관없는 감시자 */
	private Ow2_OtherList: OverwatchList = new OverwatchList();

	/** AxeView 테스트3 용 변수 */
	private Ow3List: OverwatchList = new OverwatchList();
	/** AxeView 테스트2 용 - 예제와 상관없는 감시자 */
	private Ow3_OtherList: OverwatchList = new OverwatchList();

	/** AxeView 테스트4 용 변수 */
	private Ow4List: OverwatchList = new OverwatchList();
	/** AxeView 테스트4 용 - 예제와 상관없는 감시자 */
	private Ow4_OtherList: OverwatchList = new OverwatchList();

	/** AxeView 테스트5 용 변수 */
	private Ow5List: OverwatchList = new OverwatchList();
	/** AxeView 테스트5 용 - 예제와 상관없는 감시자 */
	private Ow5_OtherList: OverwatchList = new OverwatchList();

	constructor()
	{

		//주석 제거
		this.AxeView.CommentDelete = false;



		//☆☆☆☆☆☆☆☆☆☆☆☆☆☆
		//1) 텍스트 노드(Text Node)
		//☆☆☆☆☆☆☆☆☆☆☆☆☆☆
		
		this.Ow1List.OwList.push(
			new Overwatch({
				Name: "TextNode_UnType"
				, FirstData: "텍스트 노드 불확실 타입 테스트"
				, OverwatchingOutputType: OverwatchingOutputType.String
				, OverwatchingType: OverwatchingType.Unidentified
				, OverwatchingOneIs: true
			}));

		// #region 예제와 상관없는 감시자 - 1) 텍스트 노드(Text Node)

		this.Ow1_OtherList.OwList.push(
			new Overwatch({
				Name: "txtInput1"
				, FirstData: "테스트 데이터 입력1"
				, OverwatchingOutputType: OverwatchingOutputType.String
				, OverwatchingType: OverwatchingType.Monitoring_AttrValue_Input
				, OverwatchingOneIs: true
			}));

		this.Ow1_OtherList.OwList.push(
			new Overwatch({
				Name: "funcStringSet"
				, FirstData: () =>
				{
					let sData: string = this.Ow1_OtherList.FindName("txtInput1").data;
					this.Ow1List.FindName("TextNode_UnType").data = `${sData}`;
				}
				, OverwatchingOutputType: OverwatchingOutputType.Function_NameRemoveOn
				, OverwatchingType: OverwatchingType.OutputFirst
				, OverwatchingOneIs: true
			}));

		// #endregion

		//돔 재생성 및 설정된 뷰모델 연결
		this.AxeView.BindOverwatch(
			document.getElementById("divAxeViewTset1")
			, this.Ow1List.OwList.concat(this.Ow1_OtherList.OwList));



		//☆☆☆☆☆☆☆☆☆☆☆☆☆☆
		// 2) 속성(attribute) - 값이 있는 속성
		//☆☆☆☆☆☆☆☆☆☆☆☆☆☆

		this.Ow2List.OwList.push(
			new Overwatch({
				Name: "Attr2_1_UnType"
				, FirstData: "bgRed"
				, OverwatchingOutputType: OverwatchingOutputType.String
				, OverwatchingType: OverwatchingType.Unidentified
				, OverwatchingOneIs: true
			}));

		this.Ow2List.OwList.push(
			new Overwatch({
				Name: "Attr2_2_UnType"
				, FirstData: "속성테스트1"
				, OverwatchingOutputType: OverwatchingOutputType.String
				, OverwatchingType: OverwatchingType.Unidentified
				, OverwatchingOneIs: true
			}));

		// #region 예제와 상관없는 감시자 - 2) 속성(attribute) - 값이 있는 속성

		this.Ow2_OtherList.OwList.push(
			new Overwatch({
				Name: "funcAttr2Set1"
				, FirstData: () =>
				{
					let owAttr2_1_UnType: Overwatch = this.Ow2List.FindName("Attr2_1_UnType");
					if ("bgRed" === owAttr2_1_UnType.data)
					{
						owAttr2_1_UnType.data = "bgGreen";
						this.Ow2List.FindName("Attr2_2_UnType").data = "Green";
					}
					else
					{
						owAttr2_1_UnType.data = "bgRed";
						this.Ow2List.FindName("Attr2_2_UnType").data = "Red";
					}	
				}
				, OverwatchingOutputType: OverwatchingOutputType.Function_NameRemoveOn
				, OverwatchingType: OverwatchingType.OutputFirst
				, OverwatchingOneIs: false
			}));
		// #endregion

		//돔 재생성 및 설정된 뷰모델 연결
		this.AxeView.BindOverwatch(
			document.getElementById("divAxeViewTset2")
			, this.Ow2List.OwList.concat(this.Ow2_OtherList.OwList));



		//☆☆☆☆☆☆☆☆☆☆☆☆☆☆
		//3) 속성(attribute) - 이름만 있는 속성
		//☆☆☆☆☆☆☆☆☆☆☆☆☆☆

		this.Ow3List.OwList.push(
			new Overwatch({
				Name: "Attr3_1_UnType"
				, FirstData: "attr1"
				, OverwatchingOutputType: OverwatchingOutputType.String
				, OverwatchingType: OverwatchingType.Unidentified
				, OverwatchingOneIs: true
			}));

		// #region 예제와 상관없는 감시자 - 3) 속성(attribute) - 이름만 있는 속성
		this.Ow3_OtherList.OwList.push(
			new Overwatch({
				Name: "funcAttr3Set1"
				, FirstData: () =>
				{
					let owAttr3_1_UnType: Overwatch
						= this.Ow3List.FindName("Attr3_1_UnType");
					if ("attr1" === owAttr3_1_UnType.data)
					{
						owAttr3_1_UnType.data = "attr2";
					}
					else
					{
						owAttr3_1_UnType.data = "attr1";
					}
				}
				, OverwatchingOutputType: OverwatchingOutputType.Function_NameRemoveOn
				, OverwatchingType: OverwatchingType.OutputFirst
				, OverwatchingOneIs: false
			}));
		// #endregion
		//돔 재생성 및 설정된 뷰모델 연결
		this.AxeView.BindOverwatch(
			document.getElementById("divAxeViewTset3")
			, this.Ow3List.OwList.concat(this.Ow3_OtherList.OwList));




		//☆☆☆☆☆☆☆☆☆☆☆☆☆☆
		//4) 속성(attribute) - 이름만 있는 속성
		//☆☆☆☆☆☆☆☆☆☆☆☆☆☆

		this.Ow4List.OwList.push(
			new Overwatch({
				Name: "Attr4_1_UnType"
				, FirstData: "Input 감시"
				, OverwatchingOutputType: OverwatchingOutputType.String
				, OverwatchingType: OverwatchingType.Unidentified
				, OverwatchingOneIs: true
			}));

		// #region 예제와 상관없는 감시자 - 4) 속성(attribute) - 이름만 있는 속성
		this.Ow4_OtherList.OwList.push(
			new Overwatch({
				Name: "Attr4_1_Change"
				, FirstData: (
					event: Event
					, sender: ChildNode
					, objThis: Overwatch) =>
				{
					this.Ow4_OtherList.FindName("Attr4_1_Output").data
						= this.Ow4List.FindName("Attr4_1_UnType").data;
				}
				, OverwatchingOutputType: OverwatchingOutputType.Function_NameRemoveOn
				, OverwatchingType: OverwatchingType.Monitoring
				, OverwatchingOneIs: true
			}));

		this.Ow4_OtherList.OwList.push(
			new Overwatch({
				Name: "Attr4_1_Output"
				, FirstData: ""
				, OverwatchingOutputType: OverwatchingOutputType.String
				, OverwatchingType: OverwatchingType.Monitoring
				, OverwatchingOneIs: true
			}));

		// #endregion
		
		//돔 재생성 및 설정된 뷰모델 연결
		this.AxeView.BindOverwatch(
			document.getElementById("divAxeViewTset4")
			, this.Ow4List.OwList.concat(this.Ow4_OtherList.OwList));



		//☆☆☆☆☆☆☆☆☆☆☆☆☆☆
		// 5) 속성(attribute) - Event 감시
		//☆☆☆☆☆☆☆☆☆☆☆☆☆☆
		this.Ow5List.OwList.push(
			new Overwatch({
				Name: "Attr5_1_UnType"
				, FirstData: (event) =>
				{
					alert("첫 바인딩 이벤트입니다.");
				}
				, OverwatchingOutputType: OverwatchingOutputType.String
				, OverwatchingType: OverwatchingType.Unidentified
				, OverwatchingOneIs: true
			}));

		// #region 5) 속성(attribute) - Event 감시

		this.Ow5_OtherList.OwList.push(
			new Overwatch({
				Name: "funcAttr5Set1"
				, FirstData: (event) =>
				{
					this.Ow5List.FindName("Attr5_1_UnType").data
						= (event) =>
						{
							alert("이벤트 변경1");
						};
				}
				, OverwatchingOutputType: OverwatchingOutputType.Function_NameRemoveOn
				, OverwatchingType: OverwatchingType.OutputFirst
				, OverwatchingOneIs: true
			}));

		this.Ow5_OtherList.OwList.push(
			new Overwatch({
				Name: "funcAttr5Set2"
				, FirstData: (event) =>
				{
					this.Ow5List.FindName("Attr5_1_UnType").data
						= (event) =>
						{
							alert("이벤트 변경2");
						};
				}
				, OverwatchingOutputType: OverwatchingOutputType.Function_NameRemoveOn
				, OverwatchingType: OverwatchingType.OutputFirst
				, OverwatchingOneIs: true
			}));
		// #endregion

		//돔 재생성 및 설정된 뷰모델 연결
		this.AxeView.BindOverwatch(
			document.getElementById("divAxeViewTset5")
			, this.Ow5List.OwList.concat(this.Ow5_OtherList.OwList));

	}

}


