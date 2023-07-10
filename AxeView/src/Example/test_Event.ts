

import AxeView, { Overwatch, OverwatchInterface, OverwatchingOutputType, OverwatchingType, AxeViewDomInterface } from "../AxeView/AxeView";



export default class test_01
{
	/** 액스뷰 개체 */
	private AxeView: AxeView = new AxeView();

	/** AxeView 테스트1용 변수 */
	private arrTarget1: Overwatch[] = [];

	/** AxeView 테스트2용 변수 */
	private arrTarget2: Overwatch[] = [];

	constructor()
	{
		//주석 제거
		this.AxeView.CommentDelete = false;



		//이벤트 연결 테스트 -------------------------------------
		this.arrTarget1.push(
			this.AxeView.New_MonitoringString("StringTest1", "")
		);

		this.arrTarget1.push(
			this.AxeView.New_MonitoringString("CssTest1", "AxeCss")
		);

		this.arrTarget1.push(
			new Overwatch({
				Name: "RadioChange"
				, FirstData: (
					event: Event
					, sender: ChildNode
					, objThis: Overwatch) =>
				{
					let radio: HTMLInputElement = event.target as HTMLInputElement;

					switch (radio.value)
					{
						case "1"://R
							this.arrTarget1[0].data
								= "background-color: #ff0000;"
							this.arrTarget1[1].data
								= "background-color: #ff0000;"
							break;
						case "2"://G
							this.arrTarget1[0].data
								= "background-color: #00ff00;"
							this.arrTarget1[1].data
								= "background-color: #00ff00;"
							break;
						case "3"://B
							this.arrTarget1[0].data
								= "background-color: #0000ff;"
							this.arrTarget1[1].data
								= "background-color: #0000ff;"
							break;
					}

				}
				, OverwatchingOutputType: OverwatchingOutputType.Function_NameRemoveOn
				, OverwatchingType: OverwatchingType.Monitoring
				, OverwatchingOneIs: false
			}));


		//돔 재생성 및 설정된 뷰모델 연결
		this.AxeView.BindOverwatch(
			document.getElementById("divAxeViewTset1")
			, this.arrTarget1);




		//이벤트 변경 테스트 -------------------------------------
		this.arrTarget2.push(
			this.AxeView.New_MonitoringString("StringTest1", "")
		);

		this.arrTarget2.push(
			this.AxeView.New_MonitoringString("CssTest1", "AxeCss")
		);

		this.arrTarget2.push(
			new Overwatch({
				Name: "RadioChange"
				, FirstData: this.EventChange1
				, OverwatchingOutputType: OverwatchingOutputType.Function_NameRemoveOn
				, OverwatchingType: OverwatchingType.Monitoring
				, OverwatchingOneIs: false
			}));


		//돔 재생성 및 설정된 뷰모델 연결
		this.AxeView.BindOverwatch(
			document.getElementById("divAxeViewTset2")
			, this.arrTarget2);






		document.getElementById("btnEventChange1").onclick = (event) =>
		{
			this.arrTarget2[2].data = this.EventChange1;
		};

		document.getElementById("btnEventChange2").onclick = (event) =>
		{
			this.arrTarget2[2].data = this.EventChange2;
		};

	}

	EventChange1
		= (event: Event
			, sender: ChildNode
			, objThis: Overwatch) =>
		{
			let radio: HTMLInputElement = event.target as HTMLInputElement;

			switch (radio.value)
			{
				case "1"://R
					this.arrTarget2[0].data
						= "background-color: #ff0000;"
					this.arrTarget2[1].data
						= "background-color: #ff0000;"
					break;
				case "2"://G
					this.arrTarget2[0].data
						= "background-color: #00ff00;"
					this.arrTarget2[1].data
						= "background-color: #00ff00;"
					break;
				case "3"://B
					this.arrTarget2[0].data
						= "background-color: #0000ff;"
					this.arrTarget2[1].data
						= "background-color: #0000ff;"
					break;
			}
			console.log(radio.value);
		}



	EventChange2
		= (event: Event
			, sender: ChildNode
			, objThis: Overwatch) =>
		{
			let radio: HTMLInputElement = event.target as HTMLInputElement;

			switch (radio.value)
			{
				case "1"://R
					this.arrTarget2[0].data
						= "background-color: #aa0000;"
					this.arrTarget2[1].data
						= "background-color: #aa0000;"
					break;
				case "2"://G
					this.arrTarget2[0].data
						= "background-color: #00aa00;"
					this.arrTarget2[1].data
						= "background-color: #00aa00;"
					break;
				case "3"://B
					this.arrTarget2[0].data
						= "background-color: #0000aa;"
					this.arrTarget2[1].data
						= "background-color: #0000aa;"
					break;
			}

			console.log(radio.value);
		}

}
