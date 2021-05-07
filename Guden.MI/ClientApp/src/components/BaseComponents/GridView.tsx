import React, { Component } from 'react';
import { connect } from "react-redux";
import { HashLoader } from 'react-spinners';
import { Dropdown, Grid, Pagination, Table } from 'semantic-ui-react'; 
//Store a yazılan gridView alanına karşılık <gelecektir className=""></gelecektir>
export  interface iGridViewState{
    PagerResult:
    {
            data:any[];
            pageIndex:number;
            pageSize:number;
            sortColumb:string;
            totalPage:number;
            totalRowCount:number;
            createDate:Date;
    }
  }

export interface iGridColumb{
    key: string; //kolon adı
    headerName: string; //kolon adı
}  
export interface iGridHeader {
    headers: iGridColumb[];
}
export interface iGridViewProps{
    storeName:any; //store da hangi store a karşılık gelecek..
    dispatchMethod:any; //dispatch edilen method..
    reduxStoreValues:any;
} 

export type GVProps={
    noDataFoundMessage:string;
    queryParams:any;
    sortColumb:string ;
    dispatch:Function;
}
&iGridViewProps
&iGridHeader;


export type GVStates={
    ActivePageIndex:number;
    PageSize:number;
    isBindiable:boolean;
}&iGridViewState;

 class GridView extends Component<GVProps,GVStates> 
 {
    constructor(props: Readonly<GVProps>)
    {
        super(props);
        this.state=
        {
            PagerResult:
            {
                    data:[],
                    pageIndex:1,
                    pageSize:25,
                    sortColumb:"",
                    totalPage:0,
                    totalRowCount:0,
                    createDate:new Date()
            } ,
            isBindiable:false,
            ActivePageIndex:1,
            PageSize:25
        }
    }


    dispatchStore=()=>
    {
        const {dispatchMethod,queryParams,sortColumb,dispatch}=this.props;  
        const {ActivePageIndex,PageSize}=this.state; 
        const params= {
            PageIndex:ActivePageIndex,
            PageSize: PageSize,
            SortColumb:sortColumb,
            IsSortColumbDesc:false,
            ...queryParams
        }   
        
        this.setState({
            isBindiable:true 
        });
        dispatch(dispatchMethod(params));

    }

    componentDidMount()
    {
        this.dispatchStore()
    }


    componentDidUpdate(_preProps:GVProps , _prevState:GVStates)
    {
        const {isBindiable,ActivePageIndex,PageSize}=this.state;
        const {reduxStoreValues,storeName}=this.props; 
        if(reduxStoreValues&&
            isBindiable==true&&
            (
                (reduxStoreValues[storeName].PagerResult.createDate!=_preProps.reduxStoreValues[storeName].PagerResult.createDate)
            )
          )
        {
            

        

            var store=this.props.reduxStoreValues[storeName];          
            var pagerResult=(({ PagerResult}) => ({PagerResult }))(store)            
            for (const [key, value] of Object.entries(pagerResult)) 
            {  
                for (const [key1, value1] of Object.entries(value)) 
                {
                    if((key1.toString()=="data"))
                    { 
                        this.setState({
                            isBindiable:false,
                            PagerResult :pagerResult.PagerResult
                        }) 
                    }
                }
            }   
        }

        if( ( _prevState.ActivePageIndex&&ActivePageIndex!=_prevState.ActivePageIndex)
            ||
            ( _prevState.PageSize&&PageSize!=_prevState.PageSize)
          )
          {    
               this.dispatchStore();
          }
         
    }

    
    render() 
    {
       
        const ddlItems= [{key:1,text:"25",value:25},{key:2,text:"50",value:50},{key:3,text:"100",value:100},{key:4,text:"200",value:200}];//DropDown itemları..
                        
        const {headers,noDataFoundMessage}=this.props;
        const {PagerResult,ActivePageIndex,PageSize,isBindiable}=this.state;

     
        return (
            <Grid.Column style={{padding:20}}>
            <Table celled>
              <Table.Header key={0}>
                <Table.HeaderCell  colSpan={headers.length} style={{backgroundColor:"#e0ebeb"}} >
                  <div  style={{textAlign:"left"}}>
                    <span style={{backgroundColor:"#e0ebeb"}}> Toplam satır sayısı: {PagerResult.totalRowCount} </span>
                  </div>
                  <div  style={{textAlign:"right"}}>
                  <Dropdown
                    placeholder= {PageSize.toString()}
                    openOnFocus
                    selection
                    options={ddlItems}
                    onChange={
                      (_e, data:any)=>{
                        
                         this.setState({
                           ActivePageIndex:1,
                           PageSize:parseInt(data.value)
                         });
                      }
                    }
                  />
                  </div>
                </Table.HeaderCell>
              </Table.Header>
              <GridHeader     headers={headers}></GridHeader>
              { isBindiable
                ?
                  <Table.Row  >
                    <Table.Cell  textAlign={"center"} colSpan={headers.length}  > 
                        <HashLoader loading={true} />
                    </Table.Cell>
                  </Table.Row>
                :
                  <GridBody  data={PagerResult.data} noDataFoundMessage={noDataFoundMessage}  headers={headers}/>
              }
              <Table.Footer  >            
                <Table.Cell  textAlign={"right"} colSpan={headers.length} >
                  {PagerResult.totalRowCount&&
                    <Pagination
                        boundaryRange={2}
                        defaultActivePageIndex={ActivePageIndex}
                        ellipsisItem={null}
                        firstItem={null}
                        lastItem={null}
                        siblingRange={1} 
                        onPageChange={(_value,data:any)=>{
                            this.setState({
                                ActivePageIndex:parseInt(data.activePage)});
                                                      
                            }} 
                        totalPages={PagerResult.totalPage}
                    />   
                  }   
                </Table.Cell>  
              </Table.Footer>  
            </Table>
        </Grid.Column> 
        )
    }
}
function mapStateToProps(state: any) 
{  
    return {reduxStoreValues:state};
 }
export default connect(mapStateToProps)(GridView as any);
  

export interface iGridColumb{
    key: string; //kolon adı
    headerName: string; //kolon adı
   
  }
  export type GridHeaderItem={
      
  }&iGridColumb;
  
  export interface iGridHeader {
    headers: iGridColumb[];
  }
  

//#region  Header kısmı...
  export type GridHeaderProps = {} 
  & iGridHeader;

  type GridViewState={
    ActivePageIndex:number,
    pageSize:number,
    DataRows:any[]
    }
    &iGridViewState;


    class GridHeader extends React.Component<GridHeaderProps,GridViewState> {
        constructor(props: iGridHeader) 
        {
          super(props);
         
        }
      
        render() {
          const { headers } = this.props;
          return (
            <Table.Header>
              <Table.Row>
                {headers.map((header) => (
                  <Table.HeaderCell key={header.key}>{header.headerName}</Table.HeaderCell>
                ))}
              </Table.Row>
            </Table.Header>
          );
        }
      }
//#endregion


//#region  Body kısmı

export type GridRowProps = 
{
    data:any[];
    noDataFoundMessage:string; 
} & iGridHeader;

class GridBody extends React.Component <GridRowProps>
{
  constructor(props:GridRowProps) {
    super(props);
  }

  render() {
    const { data,headers,noDataFoundMessage} = this.props;
   
     
    return (
     
        <Table.Body>
              {  
                  data.length>0
                  ?
                  data.map
                  ( ( row: any,index : number)=>
                      <Table.Row key={index}> 
                          {    
                              headers.map
                              (
                                
                              (header,headerIndex)=> 
                                 
                                  <Table.Cell key={index+headerIndex}>
                                      {row[header.key] }
                                   </Table.Cell> 
                              )
                          } 
                      </Table.Row>
                      
                  )
                  : 
                  <Table.Row  >
                      <Table.Cell  key={"center"} textAlign={"center"} colSpan={headers.length}  >{noDataFoundMessage}</Table.Cell>
                  </Table.Row>
                
              } 
        
        </Table.Body>
       
    );
  }
}

//#endregion