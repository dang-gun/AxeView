
import AxeView
, {
	Overwatch
	, OverwatchInterface
	, OverwatchingOutputType
	, OverwatchingType
} from "../../../AxeView/src/AxeView/AxeView";

import AxeViewSupport
, {
} from "../AxeViewSupport/AxeViewSupporter"


/** 테스트용 */
export default class test_01
{
	/** 액스뷰 서포트 개체 */
	private AxeViewSpt: AxeViewSupport = new AxeViewSupport();

	
	constructor()
	{
		this.AxeViewSpt.BindOverwatch(
			document.getElementById("divAxeViewTset0")
			, []);

		//돔에서 템플릿을 분리한다.
		//this.AxeViewSpt.BindOverwatch(
		//	document.getElementById("divAxeViewTset1")
		//	, []);

		if (0 < this.AxeViewSpt.OverwatchList.length)
		{

		}

		//돔 재생성 및 설정된 뷰모델 연결
		//this.AxeView.BindOverwatch(
		//	document.getElementById("divAxeViewTset")
		//	, this.arrTarget);
	}


}
