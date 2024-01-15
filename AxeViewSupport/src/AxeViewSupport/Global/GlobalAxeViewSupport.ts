//AxeView.njsproj 프로젝트를 상대경로로 참조
import AxeView, {
	Overwatch
	, OverwatchInterface
	, OverwatchingOutputType
	, OverwatchingType
} from "../../../../AxeView/src/AxeView/AxeView";


/** GlobalAxeViewSupport 구현 */
export default class GlobalAxeViewSupport
{
	/** 엑스뷰 개체*/
	static AxeView: AxeView = new AxeView();
	
	
}

