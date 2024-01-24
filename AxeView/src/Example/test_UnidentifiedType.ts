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
	private arrOw1: OverwatchList = new OverwatchList();
	/** AxeView 테스트1 용 - 예제와 상관없는 감시자 */
	private arrOw1_Other: OverwatchList = new OverwatchList();

	/** AxeView 테스트2 용 변수 */
	private arrOw2: OverwatchList = new OverwatchList();
	/** AxeView 테스트2 용 - 예제와 상관없는 감시자 */
	private arrOw2_Other: OverwatchList = new OverwatchList();

	/** AxeView 테스트3 용 변수 */
	private arrOw3: OverwatchList = new OverwatchList();
	/** AxeView 테스트2 용 - 예제와 상관없는 감시자 */
	private arrOw3_Other: OverwatchList = new OverwatchList();

	/** AxeView 테스트4 용 변수 */
	private arrOw4: OverwatchList = new OverwatchList();
	/** AxeView 테스트4 용 - 예제와 상관없는 감시자 */
	private arrOw4_Other: OverwatchList = new OverwatchList();

	constructor()
	{

		//주석 제거
		this.AxeView.CommentDelete = false;



		//☆☆☆☆☆☆☆☆☆☆☆☆☆☆
		//1) 텍스트 노드(Text Node)
		//☆☆☆☆☆☆☆☆☆☆☆☆☆☆
		
		this.arrOw1.OwList.push(
			new Overwatch({
				Name: "TextNode_UnType"
				, FirstData: "텍스트 노드 불확실 타입 테스트"
				, OverwatchingOutputType: OverwatchingOutputType.String
				, OverwatchingType: OverwatchingType.Unidentified
				, OverwatchingOneIs: true
			}));

		// #region 예제와 상관없는 감시자 - 텍스트 노드 감시

		this.arrOw1_Other.OwList.push(
			new Overwatch({
				Name: "txtInput1"
				, FirstData: "테스트 데이터 입력1"
				, OverwatchingOutputType: OverwatchingOutputType.String
				, OverwatchingType: OverwatchingType.Monitoring_AttrValue_Input
				, OverwatchingOneIs: true
			}));

		this.arrOw1_Other.OwList.push(
			new Overwatch({
				Name: "funcStringSet"
				, FirstData: () =>
				{
					let sData: string = this.arrOw1_Other.FindName("txtInput1").data;
					this.arrOw1.FindName("TextNode_UnType").data = `${sData}`;
				}
				, OverwatchingOutputType: OverwatchingOutputType.Function_NameRemoveOn
				, OverwatchingType: OverwatchingType.OutputFirst
				, OverwatchingOneIs: false
			}));

		// #endregion

		//돔 재생성 및 설정된 뷰모델 연결
		this.AxeView.BindOverwatch(
			document.getElementById("divAxeViewTset1")
			, this.arrOw1.OwList.concat(this.arrOw1_Other.OwList));



		//☆☆☆☆☆☆☆☆☆☆☆☆☆☆
		//2) 속성(attribute) - 값이 있는 속성
		//☆☆☆☆☆☆☆☆☆☆☆☆☆☆

		this.arrOw2.OwList.push(
			new Overwatch({
				Name: "Attr2_1_UnType"
				, FirstData: "bgRed"
				, OverwatchingOutputType: OverwatchingOutputType.String
				, OverwatchingType: OverwatchingType.Unidentified
				, OverwatchingOneIs: true
			}));

		this.arrOw2.OwList.push(
			new Overwatch({
				Name: "Attr2_2_UnType"
				, FirstData: "속성테스트1"
				, OverwatchingOutputType: OverwatchingOutputType.String
				, OverwatchingType: OverwatchingType.Unidentified
				, OverwatchingOneIs: true
			}));

		// #region 예제와 상관없는 감시자 - 2) 속성(attribute) - 값이 있는 속성

		this.arrOw2_Other.OwList.push(
			new Overwatch({
				Name: "funcAttr2Set1"
				, FirstData: () =>
				{
					let owAttr2_1_UnType: Overwatch = this.arrOw2.FindName("Attr2_1_UnType");
					if ("bgRed" === owAttr2_1_UnType.data)
					{
						owAttr2_1_UnType.data = "bgGreen";
						this.arrOw2.FindName("Attr2_2_UnType").data = "Green";
					}
					else
					{
						owAttr2_1_UnType.data = "bgRed";
						this.arrOw2.FindName("Attr2_2_UnType").data = "Red";
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
			, this.arrOw2.OwList.concat(this.arrOw2_Other.OwList));



		//☆☆☆☆☆☆☆☆☆☆☆☆☆☆
		//3) 속성(attribute) - 이름만 있는 속성
		//☆☆☆☆☆☆☆☆☆☆☆☆☆☆

		this.arrOw3.OwList.push(
			new Overwatch({
				Name: "Attr3_1_UnType"
				, FirstData: "attr1"
				, OverwatchingOutputType: OverwatchingOutputType.String
				, OverwatchingType: OverwatchingType.Unidentified
				, OverwatchingOneIs: true
			}));

		// #region 예제와 상관없는 감시자 - 3) 속성(attribute) - 이름만 있는 속성
		this.arrOw3_Other.OwList.push(
			new Overwatch({
				Name: "funcAttr3Set1"
				, FirstData: () =>
				{
					let owAttr3_1_UnType: Overwatch
						= this.arrOw3.FindName("Attr3_1_UnType");
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
			, this.arrOw3.OwList.concat(this.arrOw3_Other.OwList));



		//☆☆☆☆☆☆☆☆☆☆☆☆☆☆
		//4) 속성(attribute) - 이름만 있는 속성
		//☆☆☆☆☆☆☆☆☆☆☆☆☆☆

		
		//돔 재생성 및 설정된 뷰모델 연결
		this.AxeView.BindOverwatch(
			document.getElementById("divAxeViewTset4")
			, this.arrOw4.OwList.concat(this.arrOw4_Other.OwList));

	}

}


