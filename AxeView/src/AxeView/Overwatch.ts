import { OverwatchInterface, OverwatchTossOptions } from "./OverwatchInterface";
import { AxeViewDomInterface, AxeViewMoveType } from "./AxeViewDomInterface";
import { OverwatchingOutputType, OverwatchingType } from "./OverwatchingType"

/** 감시 대상  */
export class Overwatch
{
	constructor(target: OverwatchInterface)
	{
		this.Name = target.Name;
		this.NameFindStringOri
			= new RegExp(`\{\{${this.Name}+\}\}|\{\{${this.Name}+@.*\}\}`, 'g');
		this.NameFindStringLowerCaseOri
			= new RegExp(`\{\{${this.Name.toLowerCase()}+\}\}|\{\{${this.Name.toLowerCase()}+@.*\}\}`, 'g');

		//전달 옵션
		if (undefined !== target.TossOption
			&& null !== target.TossOption)
		{//있을 때만 전달
			this.TossOption = target.TossOption;
		}

		if (undefined !== target.AxeDomSet_DataEdit
			&& null !== target.AxeDomSet_DataEdit)
		{//있을 때만 전달
			this.AxeDomSet_DataEdit = target.AxeDomSet_DataEdit;
		}


		//전달 받은 옵션에서 필요한 값만 따로 저장
		this.OverwatchingOutputType = target.OverwatchingOutputType;
		this.OverwatchingType = target.OverwatchingType;
		this.OverwatchingOneIs = target.OverwatchingOneIs;


		if ("" === target.FirstData
			|| " " === target.FirstData)
		{
			if (OverwatchingOutputType.Dom === this.OverwatchingOutputType)
			{
				//빈값은 돔인경우만 허용된다.
				this._DataNow = "";
			}
			else if (OverwatchingOutputType.String === this.OverwatchingOutputType)
			{
				//이 값은 절대 비어있으면 안된다.(빈값을 쓰려면 스페이스를 사용하자)
				//빈값으로는 노드를 생성하지 않고 있기 때문이다.
				this._DataNow = " ";
			}
			else if (OverwatchingOutputType.Html === this.OverwatchingOutputType)
			{
				//데이터가 html인경우 빈값을 넣으면 안되고 보이지 않는 요소라라도 하나 넣어야 한다.
				//(<div></div>)
				//안그러면 text 노드가 생성되서 에러가 난다.
				//그래서 여기서 넣어준다.
				this._DataNow = "<div></div>";
			}
		}
		else
		{
			this._DataNow = target.FirstData;
		}


		
	}

	/** 
	 *  액스뷰에서 지정한 고유번호.
	 *  액스뷰를 바인딩할때 자동으로 입력된다.
	 *  이 값이 중복되면 교체(Replace)가 잘 안될 수 있다.
	 * */
	public MyNumber: number = 0;

	/**
	 * 찾을 이름
	 * OverwatchInterface.Name 참조
	 * */
	public Name: string = "";

	/** 이름 검색용 문자열 - 원본
	 * 자동생성된다.*/
	private NameFindStringOri: RegExp;
	/** 이름 검색용 문자열
	 * 자동생성된다.*/
	public get NameFindString(): RegExp
	{
		return this.NameFindStringOri;
	}

	/** 이름 검색용 문자열(소문자) - 원본
	 * 자동생성된다.*/
	private NameFindStringLowerCaseOri: RegExp;
	/** 이름 검색용 문자열(소문자)
	 * 자동생성된다.*/
	public get NameFindStringLowerCase(): RegExp
	{
		return this.NameFindStringLowerCaseOri;
	}



	/** 
	 * 기본값으로 사용할 전달 옵션
	 * 뷰단에서 넘어오는 옵션은 이 옵션과 합쳐서 사용한다.
	 * 뷰에서 넘어온 옵션이 우선이다.
	 */
	public TossOption: { [key: string]: string } = {};

	public TossOptionFirst<T>():T
	{
		return this.Dom_AxeViewList[0].TossOption as T;
	}


	/** 지금 가지고 있는 데이터 */
	private _DataNow: string | Function | HTMLElement = "";
	/** 현재가지고 있는 값을 임의로 수정 */
	public set DataNow(dataNow: string | Function | HTMLElement)
	{
		this._DataNow = dataNow;
	}

	/** 임시로 들고 있어야할 데이터가 있을때 사용하는 속성 */
	public Temp?: any = null;

	/**
	 * 실제 동작 get
	 */
	private DataNowGet: Function = (): string | Function | HTMLElement =>
	{
		let sReturn: string | Function | HTMLElement = "";

		if (true === this.DomIsOri)
		{//돔 개체 전용
			sReturn = this._DataNow;
		}
		else if (true === this.ValueMonitoringIs)
		{//값 모니터링 전용
			
			if (0 < this.Dom_AxeViewListOri.length)
			{
				//값 모니터링은 돔의 value를 우선한다.
				sReturn = (this.Dom_AxeViewListOri[0].Dom as Attr).value;
			}
		}
		else
		{
			sReturn = this._DataNow;
		}
		return sReturn;
	};
	/**
	 * 실제 동작 set
	 * @param data
	 */
	private DataNowSet: Function = function (data: any)
	{

		//기존값 백업
		let OldData: any = this._DataNow;
		//새값 사용
		let DataNowThis = data;
		//this._DataNow에 데이터를 저장할지 여부
		let bDataNowSaveIs: boolean = true;
		

		
		if (null !== this.Dom_AxeViewListOri
			&& 0 < this.Dom_AxeViewListOri.length)
		{//돔이 있으면 실행

			//저장된 돔개수만큼 실행
			for (let nDomIdx: number = 0; nDomIdx < this.Dom_AxeViewListOri.length; ++nDomIdx)
			{
				let item: AxeViewDomInterface = this.Dom_AxeViewList[nDomIdx];

				//화면에 표시한 데이터 백업
				let OldDataView: string | null = item.DataView;
				//화면 표시용 데이터
				let ViewData = this.AxeDomSet_DataEdit(this, item, DataNowThis);

				
				if (AxeViewMoveType.Node === item.AxeViewMoveType)
				{
					if (typeof ViewData === "string")
					{
						//현재 데이터 저장
						item.DataView = ViewData;
						(item.Dom as Node).nodeValue = item.DataView;
					}
					else
					{
						//문자열 타입일때 다른 형식을 넣을 수 없습니다.
						console.log("AxeView Overwatch : When it is a string type, other formats cannot be entered.");
						bDataNowSaveIs = false;
					}
				}
				else if (AxeViewMoveType.Dom === item.AxeViewMoveType)
				{//돔인 경우

					//돔은 교체만 허용한다.
					if (true === (DataNowThis instanceof HTMLElement))
					{//들어온 값이 HTMLElement다.

						//돔의 경우 이전 개체(OldData)의 부모를 찾아 .replaceChild를 해야 한다.
						//2024-01-16 : 부모개체를 바인딩 하는 시점에서 저장하도록 하였으므로
						//				저장된 부모개체를 사용한다.
						//(OldData.parentElement as HTMLElement)
						item.ParentDom.replaceChild(DataNowThis, OldData);

						//2024-01-16 : 돔 교체를 하도록 동작이 변경되었으므로
						//				마지막 사용된 dom 개체를 저장해야 한다.
						item.Dom = DataNowThis;
					}
					else
					{
						//DOM 타입일때 다른 형식을 넣을 수 없습니다.
						console.log("AxeView Overwatch : When it is a DOM type, other formats cannot be entered.");
						bDataNowSaveIs = false;
					}
					
				}
				else if (AxeViewMoveType.Attr_OneValue === item.AxeViewMoveType
					|| AxeViewMoveType.Attr_ValueMonitoring === item.AxeViewMoveType)
				{
					//현재 데이터 저장
					item.DataView = ViewData;
					(item.Dom as Attr).value = item.DataView;
				}
				else if (AxeViewMoveType.Attr_ReplaceValue === item.AxeViewMoveType)
				{
					let attrTemp: Attr = item.Dom as Attr;

					//벨류의 경우 대소문자 구분이 가능하므로 소문자 변환을 하면 안된다.
					//속성을 교체하는 방식인 경우 빈값이 들어오면 교체하지 못하므로
					//임의의 고유값을 생성하여 저장한다.

					
					//이전 데이터를 백업하고
					let OldDataTemp: string = item.DataView;
					if ("" === OldDataTemp)
					{
						OldDataTemp = OldData;
					}

					//현재 데이터 저장
					item.DataView = ViewData;
					
					if ("" === item.DataView)
					{//현재 데이터가 비어있다.

						//임의의 값을 생성해 준다.
						item.DataView
							= OldData + "_AxeViewTemp" + this.MyNumber;
					}

					if (true === this.OverwatchingOneIs)
					{//한개만 교체
						attrTemp.value
							= attrTemp.value.replace(
								OldDataTemp
								, item.DataView);
					}
					else
					{//전체 교체
						attrTemp.value
							= this.ReplaceAll(
								attrTemp.value
								, OldDataTemp
								, item.DataView);
					}
				}
				else if (AxeViewMoveType.Attr_Valueless === item.AxeViewMoveType)
				{
					//값이 없는 값은 속성자체를 바꿔야 한다.
					let elemTemp: HTMLElement = (item.Dom as HTMLElement);
					//기존 이름 제거
					elemTemp.removeAttribute(OldData.toLowerCase());
					//새 이름 추가(값없음)
					elemTemp.setAttribute(DataNowThis, "");
				}
				else if (AxeViewMoveType.Attr_Event === item.AxeViewMoveType)
				{
					//기존에 연결된 이벤트 제거
					(item.Dom as Node).removeEventListener(item.EventName, item.Event);

					//새로들어온 이벤트 연결
					item.Event = DataNowThis;
					(item.Dom as Node).addEventListener(item.EventName, item.Event);
				}
				else
				{

					//모두 아니면 html 타입으로 판단한다.
					if (true === (DataNowThis instanceof Element)
						|| true === (DataNowThis instanceof HTMLElement)
						//|| true === (data instanceof ChildNode)
						|| true === (DataNowThis instanceof Node))
					{//들어온 데이터가 html개체 타입이다.
						(item.Dom as HTMLElement).innerHTML = "";
						(item.Dom as HTMLElement)
							.insertAdjacentElement("beforeend", DataNowThis);
					}
					else
					{//html string 이다.

						//현재 데이터 저장
						item.DataView = ViewData;
						(item.Dom as HTMLElement).innerHTML = item.DataView;
					}
					
				}
			}//end for nDomIdx
			
		}

		if (true === bDataNowSaveIs)
		{//새값 저장 여부

			//조건에 따라 새값이 UI에 적용되지 않는 경우가 있으므로
			//데이터 백업을 할지 말지를 각 코드에서 확인하여 전달한다.

			//새값 저장
			this._DataNow = data;
		}
	};

	/** 
	 * 출력 방식
	 * OverwatchInterface.OverwatchingOutputType 참고
	 * */
	public OverwatchingOutputType: OverwatchingOutputType;
	/** 
	 *  감시 방식
	 *  OverwatchInterface.OverwatchingType 참고
	 * */
	public OverwatchingType: OverwatchingType;
	/** 
	 * 한개만 감시할지 여부 
	 * OverwatchInterface.OverwatchingOneIs 참고
	 */
	public OverwatchingOneIs: boolean = false;;

	/** 
	 * 연결되있는 액스돔 리스트
	 * 단순 출력의 경우 추가하지 않는다.
	 * 여러개가 연결된 경우 각각의 돔이들어있게 된다.
	 * 'Action'이 어트리뷰트에 연결된 경우 대상 dom이 저장되고,
	 * innerText영역에 있는 경우 임의로 생성된 태그가 지정된다.
	 * 
	 * Dom 개체 형식의 경우 전달 받은 돔은 무조건 한개만 표시할 수 있으므로 여러개가 지정해봐야 의미없다.
	 * */
	private Dom_AxeViewListOri: AxeViewDomInterface[] = [];
	/** 연결된 돔 */
	public get Dom_AxeViewList(): AxeViewDomInterface[]
	{
		return this.Dom_AxeViewListOri;
	}
	/** Dom_AxeViewList의 정보를 갱신한다.  */
	public Dom_AxeViewList_Refresh(): void
	{
		for (let i = 0; i < this.Dom_AxeViewListOri.length; ++i)
		{
			let item: AxeViewDomInterface = this.Dom_AxeViewListOri[i];

			//부모 개체 미리 찾아두기
			item.ParentDom = (item.Dom as HTMLElement).parentElement;
		}//end for i
	}


	/** 연결된 돔 리스트에서 가장 첫 액스돔이 가지고 있는 돔 */
	public get Dom(): HTMLElement | Node | Attr | Function
	{
		return this.Dom_AxeViewList[0].Dom;
	}
	/** 연결된 돔 리스트에서 가장 첫 액스돔이 가지고 있는 돔 */
	private set Dom(value: HTMLElement | Node | Attr | Function)
	{
		this.Dom_AxeViewList[0].Dom = value;
	}



	/** 연결된 돔 비우기 */
	public Dom_Clear()
	{
		this.Dom_AxeViewListOri = [];
	}

	/** 
	 * 모니터링 중인 데이터 - 읽기
	 * Action을 읽어 리턴한다.
	 * UI가 갱신되지 않았다면 UI와 다른 값일 수 있다.
	 * */
	public get data()
	{
		return this.DataNowGet();
	}
	/** 
	 *  모니터링 중인 데이터 - 쓰기 
	 *  Action에 데이터를 저장한다.
	 *  설정된 'OverwatchingType'에 따라 화면 갱신이 있을 수 있다.
	 */
	public set data(value: any)
	{
		this.DataNowSet(value);
	}
	/** 지금 가지고 있는 데이터를 다시 출력시도한다.
	 * dom이 새로 설정됐다면 꼭 호출해야 한다.*/
	public DataRefresh()
	{
		this.data = this.data;
	}



	/** 'OverwatchingType'가 한번만 적중해야 하는 옵션인경우 
	 * 맨처음 적중하면 true가 된다.*/
	public OneDataIs: boolean = false;

	/** 값 모니터링 전용인지 여부 - 원본 */
	private ValueMonitoringIsOri: boolean = false;
	/** 값 모니터링 전용인지 여부 */
	public get ValueMonitoringIs(): boolean { return this.ValueMonitoringIsOri; }
	/** 값 모니터링 전용인지 여부 */
	public set ValueMonitoringIs(value: boolean) { this.ValueMonitoringIsOri = value; } 

	/** 돔 개체 전용인지 여부 - 원본 */
	private DomIsOri: boolean = false;
	/** 돔 개체 전용인지 여부 */
	public get DomIs(): boolean { return this.DomIsOri; }
	/** 돔 개체 전용인지 여부 */
	public set DomIs(value: boolean) { this.DomIsOri = value; } 

	
	/**
	 * Set동작이 시작되어 데어를 화면에 표시하기 직전에 호출되는 함수
	 * 
	 * 이 이벤트는 연결된 개체의 개수만큼 호출된다.
	 * @param owThis 이 이벤트가 발생한 감시대상
	 * @param adThis 이 이벤트를 호출한 액스돔 개체
	 * @param data 전달된 값
	 * @returns 출력값이 문자열인경우 문자열을 직접 조작하려는 리턴값. 문자열이 아닌경우 빈값을 리턴하는것이 좋다.
	 */
	public AxeDomSet_DataEdit
		= (owThis: Overwatch, adThis: AxeViewDomInterface, data: any): string => { return data; }

	/**
	 * 지정한 문자열을 모두 찾아 변환한다.
	 * @param sOriData 원본
	 * @param sSearch 찾을 문자열
	 * @param sReplacement 바꿀 문자열
	 * @returns 완성된 결과
	 */
	private ReplaceAll(sOriData: string, sSearch: string, sReplacement: string): string
	{
		return sOriData.replace(new RegExp(sSearch, 'g'), sReplacement);
	}


	/**
	 * 출력 타입 변경
	 * 성능에 안좋은 영향을 주므로 가급적 안쓰는 것이 좋다.
	 * @param typeOverwatchingOutput
	 */
	public OutputTypeChange_All(typeOverwatchingOutput: OverwatchingOutputType): void
	{
		for (let nDomIdx: number = 0; nDomIdx < this.Dom_AxeViewListOri.length; ++nDomIdx)
		{
			let item: AxeViewDomInterface = this.Dom_AxeViewList[nDomIdx];

			

			switch (typeOverwatchingOutput)
			{
				case OverwatchingOutputType.String:
					{
						if (AxeViewMoveType.HTMLElement === item.AxeViewMoveType
							|| AxeViewMoveType.Dom === item.AxeViewMoveType)
						{//원래 HTMLElement 타입이나
							//Dom 타입이였다.

							//변환 시작
							this.OutputTypeChange_One(item, typeOverwatchingOutput);
						}
						else if (AxeViewMoveType.Node === item.AxeViewMoveType)
						{
							//같은 타입으로 변환하려고 했다.
							console.log("AxeView Overwatch : I tried to change it to the same type.");
						}
						else
						{//변환 할 수 없는 타입
							throw "This is a type that cannot be converted.";
						}

						//타입변경 확정
						item.AxeViewMoveType = AxeViewMoveType.Node;
					}
					break;

				case OverwatchingOutputType.Html:
					{
						if (AxeViewMoveType.Node === item.AxeViewMoveType
							|| AxeViewMoveType.Dom === item.AxeViewMoveType)
						{//원래 Node 타입이나
							//Dom 타입이였다.

							//변환 시작
							this.OutputTypeChange_One(item, typeOverwatchingOutput);
						}

						//타입변경 확정
						item.AxeViewMoveType = AxeViewMoveType.HTMLElement;
					}
					break;

				case OverwatchingOutputType.Dom:
					{
						if (AxeViewMoveType.Node === item.AxeViewMoveType
							|| AxeViewMoveType.HTMLElement === item.AxeViewMoveType)
						{//원래 Node 타입이나
							//HTMLElement 타입이였다.

							//변환 시작
							this.OutputTypeChange_One(item, typeOverwatchingOutput);
						}

						//타입변경 확정
						item.AxeViewMoveType = AxeViewMoveType.Dom;
					}
					break;

			}//end switch (typeOverwatchingOutput)
			
		}//end for i
	}

	/**
	 * 지정한 아이템의 출력타입을 변경한다.
	 * 기존 출력타입 체크를 하지 않으므로 호출전에 기존 출력타입을 확인한 후 호출해야한다.
	 * @param avdItem
	 * @param typeOverwatchingOutput
	 */
	private OutputTypeChange_One(
		avdItem: AxeViewDomInterface
		, typeOverwatchingOutput: OverwatchingOutputType)
	{
		//텍스트 노드를 Html엘리먼트로 변경해야 한다.
		//부모의 자식노드를 하나식 백업한다.
		//변경해야할 노드가 나오면 해당 노드만 교체하여 백업한다.
		//백업된 노드를 부모노드에 추가한다.
		
		//부모 노드 찾기
		let parentElement: HTMLElement = avdItem.ParentDom;
		
		let listOldChild: NodeListOf<ChildNode>
			= parentElement.childNodes;

		//기존에 가지고 있던 자식들 옮기기
		let arrOldChild: ChildNode[] = [];


		for (let i = 0; i < listOldChild.length; ++i)
		{
			let item: ChildNode = listOldChild[i];

			if (item === avdItem.Dom)
			{//변환할 대상

				switch (typeOverwatchingOutput)
				{
					case OverwatchingOutputType.String:
						{
							let newTextNode: Text 
								= document.createTextNode(this.data);
							//돔 교체
							this.Dom = newTextNode;
							//자식에 추가
							arrOldChild.push(newTextNode);
						}
						break;

					case OverwatchingOutputType.Html:
					case OverwatchingOutputType.Dom:
						{
							//html 개체를 만들고
							let newMElem: HTMLElement
								= document.createElement("div");
							//내용물을 html 처리를 한 후
							newMElem.insertAdjacentHTML(
								"beforeend"
								, `${this.data}`);


							//돔 교체
							this.Dom = newMElem;
							//자식에 추가
							arrOldChild.push(newMElem);

							if (OverwatchingOutputType.Dom === typeOverwatchingOutput)
							{//돔이다.

								//돔의 경우 기존값도 변경하지 않으면 에러가 난다.
								//돔에서 돔으로 변경된게 아닌이상 기존 주소가 없어서
								//replaceChild에러가 나게 된다.
								//그러니 무조건 this._DataNow를 새로 생성한 개체로 교체해야 한다.
								this._DataNow = newMElem;
							}
						}
						break;
				}//end switch (typeOverwatchingOutput)
				
			}
			else
			{//일반 대상

				//변경이 없는 노드는 그대로 추가한다.
				arrOldChild.push(item);
			}
		}

		//모두 교체하기
		parentElement.replaceChildren(...arrOldChild);
	}


	// #region HTMLElement 전용 동작

	/**
	 * 돔 자체를 교체 한다.
	 * 'AxeViewMoveType'이 'AxeViewMoveType.HTMLElement'인 개체만 동작한다.(나머지는 무시됨)
	 * @param data 교체할 HTMLElement. 혹은 'HTML string'
	 * 'HTML string'인 경우 최상위 한개만 조작가능하므로 여러 부모를 생성하는 경우 맨 처음 한개만 사용된다.
	 * 예> "<div id='div1'></div><div id='div2'></div>" 이 경우 'div1'만 생성되어 교체됨
	 * @returns 처리 결과
	 * 0 : 정상 처리
	 * 1 : 'HTMLElement'이나 'HTML string'만 사용할 수 있습니다.
	 * 2 : 'HTML string'이 잘못되었습니다.
	 */
	public DomReplace(data: HTMLElement | string)
		: number
	{
		let nReturn: number = 0;

		//기존값 백업
		let OldData: any = this._DataNow;

		//바꿀 데이터로 사용할 인스턴스
		let DataNowThis: HTMLElement;

		if (true === (data instanceof HTMLElement))
		{//HTMLElement이다.

			//그대로 사용
			DataNowThis = data as HTMLElement;
		}
		else if ("string" === typeof data )
		{//string이다.

			//HTML string인지 구분할 방법이 없으므로 그냥 진행한다.

			//문자열을 html로 바꾼다.
			let domTemp: HTMLTemplateElement = document.createElement("template");
			domTemp.innerHTML = data as string;
			DataNowThis = domTemp.content.firstChild as HTMLElement;

			if (null === DataNowThis)
			{
				nReturn = 2;
			}
		}
		else
		{
			//'HTMLElement'이나 'HTML string'만 사용할 수 있습니다.
			//"Only 'HTMLElement' or 'HTML string' can be used."
			nReturn = 1;
		}

		if (0 === nReturn)
		{

			if (null !== this.Dom_AxeViewListOri
				&& 0 < this.Dom_AxeViewListOri.length)
			{
				//저장된 돔개수만큼 실행
				for (let nDomIdx: number = 0; nDomIdx < this.Dom_AxeViewListOri.length; ++nDomIdx)
				{
					let item: AxeViewDomInterface = this.Dom_AxeViewList[nDomIdx];

					if (AxeViewMoveType.HTMLElement === item.AxeViewMoveType)
					{
						//이전 개체(OldData)의 부모를 찾아 .replaceChild를 해야 한다.
						item.ParentDom.replaceChild(DataNowThis, item.Dom as HTMLElement);

						//마지막 사용된 dom 개체를 저장해야 한다.
						item.Dom = DataNowThis;
					}
				}//end for nDomIdx
				
			}
			
		}

		return nReturn;
	}

	// #endregion
}

