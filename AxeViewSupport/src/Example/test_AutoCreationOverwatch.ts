
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


/** 감시자 자동 생성 테스트 */
export default class test_AutoCreationOverwatch
{
	/** 액스뷰 서포트 개체 */
	private AxeViewSpt: AxeViewSupport = new AxeViewSupport();

	
	constructor()
	{
		//지정되지 않은 뷰모델 자동으로 생성
		this.AxeViewSpt.BindOverwatch(
			document.getElementById("divAxeViewTset0")
			, []
			, false);

		console.log("Overwatch count : " + this.AxeViewSpt.OverwatchList.length);

		console.log("-----------------------------------");
		for (let i = 0; i < this.AxeViewSpt.OverwatchList.length; ++i)
		{
			let item: Overwatch = this.AxeViewSpt.OverwatchList[i];
			console.log(`Name : ${item.Name}, OverwatchingType : ${item.OverwatchingType}, OverwatchingOutputType : ${item.OverwatchingOutputType}`);

		}//end for i

		console.log("-----------------------------------");

		this.AxeViewSpt.OverwatchObject.AttrValue_1_UnType.data
			= "벨류(Value)로 바인딩 됨";

		this.AxeViewSpt.OverwatchObject.Attr5_1_UnType.data
			= (event) =>
			{
				this.AxeViewSpt.OverwatchObject.TextNode_UnType.data
					= this.AxeViewSpt.OverwatchObject.AttrValue_1_UnType.data;
			};

	}


}
