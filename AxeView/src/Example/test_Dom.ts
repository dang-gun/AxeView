﻿

import AxeView, { Overwatch, OverwatchInterface, OverwatchingOutputType, OverwatchingType } from "../AxeView/AxeView";



export default class test_Dom
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
				, OverwatchingType: OverwatchingType.Monitoring
				, OverwatchingOneIs: true
			}));

		this.arrTarget.push(
			//돔 찾기
			new Overwatch({
				Name: "HtmlDom2"
				, FirstData: ""
				, OverwatchingOutputType: OverwatchingOutputType.Dom
				, OverwatchingType: OverwatchingType.Monitoring
				, OverwatchingOneIs: true
			}));

		//돔 재생성 및 설정된 뷰모델 연결
		this.AxeView.BindOverwatch(
			document.getElementById("divAxeViewTset")
			, this.arrTarget);



		document.getElementById("btnClick").onclick
			= (event) =>
			{
				this.TextInput();

				let findTarget = document.querySelector("#divAxeViewTset > div");


				let findParent = document.querySelector("#divAxeViewTset");
				findParent.replaceChild(this.domNew, findTarget);
			};
		document.getElementById("btnClick2").onclick
			= (event) =>
			{
				this.TextInput();

				this.arrTarget[0].data = this.domNew;

				this.arrTarget[1].data = this.TextInputNew();
			};
	}

	private TextInput = () =>
	{
		let sTnput = (document.getElementById("txtInput") as HTMLInputElement).value;
		this.domNew.innerHTML = "<h5>" + sTnput + "</h5>";
	}

	private TextInputNew = (): HTMLElement =>
	{
		let sTnput = (document.getElementById("txtInput") as HTMLInputElement).value;

		let domReturn = document.createElement("div");
		domReturn.innerHTML = "<h5>" + sTnput + "</h5>";

		return domReturn;
	}
}
