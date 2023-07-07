

import AxeView, { Overwatch, OverwatchInterface, OverwatchingOutputType, OverwatchingType, AxeViewDomInterface } from "../AxeView/AxeView";



export default class test_Option2
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
			//모니터링 문자열
			new Overwatch({
				Name: "Money"
				, FirstData: "0"
				, OverwatchingOutputType: OverwatchingOutputType.String
				, OverwatchingType: OverwatchingType.Monitoring
				, OverwatchingOneIs: false
				, AxeDomSet_DataEdit: this.AxeDomSet_DataEdit
			}));


		//돔 재생성 및 설정된 뷰모델 연결
		this.AxeView.BindOverwatch(
			document.getElementById("divAxeViewTset")
			, this.arrTarget);


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

	private AxeDomSet_DataEdit(
		objThis: Overwatch
		, axeDom: AxeViewDomInterface
		, data: any)
		: string
	{
		let sReturn = "";

		let tossOpt: { val: string, coma: string, currency: string }
			= axeDom.TossOptionType<{ val: string, coma: string, currency: string }>();
		let nMoney: number = Number(data);

		if (false === isNaN(nMoney))
		{//숫자형이 맞다.

			if ("true" === tossOpt.coma)
			{//콤마 사용
				sReturn = nMoney.toLocaleString();
			}
			else
			{
				sReturn = nMoney.toString();
			}

			if ("" !== tossOpt.currency)
			{
				sReturn = tossOpt.currency + " " + sReturn;
			}
		}

		//debugger;
		return sReturn;
	}
}