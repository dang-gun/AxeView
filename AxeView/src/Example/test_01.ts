

import AxeView, { Overwatch, OverwatchInterface, OverwatchingOutputType, OverwatchingType, AxeViewDomInterface } from "../AxeView/AxeView";



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


		this.arrTarget.push(this.AxeView.New_MonitoringString("Money", "0"));


		//돔 재생성 및 설정된 뷰모델 연결
		this.AxeView.BindOverwatch(
			document.getElementById("divAxeViewTset")
			, this.arrTarget);


		//전체 표시
		this.ViewAll(this.arrTarget[0], 1000000000);



		//이벤트 연결
		document.getElementById("btnClick").onclick
			= (event) =>
			{
				this.arrTarget[0].data = this.TextInput();
			}



		
	}

	private TextInput = (): number =>
	{
		return Number((document.getElementById("txtInput") as HTMLInputElement).value);
		
	}

	private ViewAll(ow: Overwatch, nMoney: number)
	{
		let arrOwDom: AxeViewDomInterface[] = ow.Dom_AxeViewList;

		for (let i = 0; i < arrOwDom.length; ++i)
		{
			let item: AxeViewDomInterface = arrOwDom[i];
			this.ViewOneText(item, nMoney);
		}
	}

	private ViewOneText(owDom: AxeViewDomInterface, nMoney: number)
	{
		
	}

}
