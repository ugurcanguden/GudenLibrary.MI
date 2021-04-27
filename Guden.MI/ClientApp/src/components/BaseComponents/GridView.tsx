import React, { Component } from "react";
import { Table, Grid, Icon, Modal, Pagination, Dropdown } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";



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

class GridBody extends React.Component <GridRowProps>
{
  constructor(props:GridRowProps) {
    super(props);
  }

  render() {
    const { data,headers,noDataFoundMessage,activePageIndex,pageSize } = this.props;
   
     
    return (
     
        <Table.Body>
              {  
                  data.length>0?
                  data.filter(
                      i=>
                      (
                          data.indexOf(i)>=((activePageIndex-1)*pageSize)+1
                          &&
                          data.indexOf(i)<=activePageIndex*pageSize
                      
                      ))
                      .map
                  ( ( row: any)=>
                      <Table.Row>
                          {
                              headers.map
                              (
                              header=>   <Table.Cell>{row[header.key]}</Table.Cell>
                              
                              )
                          } 
                      </Table.Row>
                      
                  )
                  : 
                  <Table.Row  >
                      <Table.Cell  textAlign={"center"} colSpan={headers.length}  >{noDataFoundMessage}</Table.Cell>
                  </Table.Row>
                
              } 
        
        </Table.Body>
       
    );
  }
}


type GridViewState={
    ActivePageIndex:number,
    PageSize:number
    };


class GridView extends Component<GridViewProps,GridViewState> 
{
  constructor(props: GridViewProps) 
  {
    super(props);
    this.state=
    {
        ActivePageIndex:1,
        PageSize:25
    }
  }

  render()  
  {
    const ddlItems=
      [
        {
          key:1,
          text:"25",
          value:25
        },
        {
          key:2,
          text:"50",
          value:50
        },
        {
          key:3,
          text:"100",
          value:100
        },
        {
          key:4,
          text:"200",
          value:200
        }
    ];
    

    const { 
            headers,
            data 
          } = this.props;
  
    const {
              ActivePageIndex,
              PageSize
          } = this.state;
   
    return (
                <Grid.Column style={{padding:20}}>
                  <Table celled>
                    <Table.Header>
                      <Table.HeaderCell  colSpan={headers.length} style={{backgroundColor:"#e0ebeb"}} >
                        <div  style={{textAlign:"left"}}>
                          <span style={{backgroundColor:"#e0ebeb"}}> Toplam satır sayısı: {data.length} </span>
                        </div>
                        <div  style={{textAlign:"right"}}>
                        <Dropdown
                          placeholder= {PageSize.toString()}
                          openOnFocus
                          selection
                          options={ddlItems}
                          onChange={
                            (e, data)=>{
                               this.setState({
                                 ActivePageIndex:1,
                                 PageSize:parseInt(data.value)
                               })
                            }
                          }
                        />
                        </div>
                     



                      </Table.HeaderCell>
                    </Table.Header>
                    <GridHeader headers={headers}></GridHeader>
                    <GridBody  {...this.props} activePageIndex={ActivePageIndex} pageSize= {PageSize} />
                    <Table.Footer  >            
                      <Table.Cell  textAlign={"right"} colSpan={headers.length} >
                        {data.length>0&& 
                          <Pagination
                              boundaryRange={0}
                              defaultActivePageIndex={ActivePageIndex}
                              ellipsisItem={null}
                              firstItem={null}
                              lastItem={null}
                              siblingRange={1}
                              onPageChange={(value,data:any)=>{this.setState({ActivePageIndex:parseInt(data.activePage)})}}
                              totalPages={Math.floor(data.length/PageSize)+1}
                          />   
                        }   
                      </Table.Cell>  
                    </Table.Footer>
                  </Table> 
              </Grid.Column> 
            );
  }
}

export default GridView;


////#region  type defination
export interface iGridColumb{
  key: string; //kolon adı
  headerName: string; //kolon adı
 
}
export type GridHeaderItem={
    
}&iGridColumb;


export interface iGridHeader {
  headers: iGridColumb[];
}

export type GridHeaderProps = {} 
& iGridHeader;

export type GridRowProps = 
{
    data:any[];
    noDataFoundMessage:string;
    activePageIndex:number;
    pageSize:number;
} & iGridHeader;


export interface iGrid {
  headers: iGridColumb[];
  selectMethod: string;
}
export type GridViewProps = 
{
    
} 
&GridRowProps
& iGrid;


////#endregion
