

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
			this.AxeView.New_MonitoringString("StringTest1", "")
		);

		this.arrTarget.push(
			this.AxeView.New_MonitoringString("CssTest1", "AxeCss")
		);

		this.arrTarget.push(
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
							this.arrTarget[0].data
								= "background-color: #ff0000;"
							this.arrTarget[1].data
								= "background-color: #ff0000;"
							break;
						case "2"://G
							this.arrTarget[0].data
								= "background-color: #00ff00;"
							this.arrTarget[1].data
								= "background-color: #00ff00;"
							break;
						case "3"://B
							this.arrTarget[0].data
								= "background-color: #0000ff;"
							this.arrTarget[1].data
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
			document.getElementById("divAxeViewTset")
			, this.arrTarget);
	
	}


}
