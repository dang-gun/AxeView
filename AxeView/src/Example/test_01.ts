

import AxeView, { Overwatch, OverwatchInterface, OverwatchingOutputType, OverwatchingType } from "../AxeView/AxeView";



export default class test_01
{
	/** 액스뷰 개체 */
	private AxeView: AxeView = new AxeView();

	/** AxeView 테스트용 변수 */
	private arrTarget: Overwatch[] = [];

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
				, OverwatchingType: OverwatchingType.OutputFirst
				, OverwatchingOneIs: true
			}));

		//돔 재생성 및 설정된 뷰모델 연결
		this.AxeView.BindOverwatch(
			document.getElementById("divAxeViewTset")
			, this.arrTarget);



		document.getElementById("btnClick").onclick = this.TestCilck;
		document.getElementById("btnClick2").onclick = this.TestCilck2;
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
