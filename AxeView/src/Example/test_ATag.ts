

import AxeView, { Overwatch, OverwatchInterface, OverwatchingOutputType, OverwatchingType } from "../AxeView/AxeView";



export default class test_ATag
{
	/** 액스뷰 개체 */
	private AxeView: AxeView = new AxeView();

	/** AxeView 테스트용 변수 */
	private arrTarget: Overwatch[] = [];


	constructor()
	{
		//주석 제거
		this.AxeView.CommentDelete = false;

		this.arrTarget.push(this.AxeView.New_MonitoringString("OutData", "클릭하기전"));

		//돔 재생성 및 설정된 뷰모델 연결
		this.AxeView.BindOverwatch(
			document.getElementById("divAxeViewTset")
			, this.arrTarget);

		//돔 추가 처리
		this.AxeView.DomHelper(
			document.getElementById("divAxeViewTset")
			, {
				OptionUseIs: true
				, AtagClickEventCancel: true
				, AtagClickEventCallback: (event: any) =>
				{
					console.log("A tag click : " + (event.target as any).pathname);
					this.arrTarget[0].data = "클릭된 주소 : " + (event.target as any).pathname;
				}
			});
	}


}
