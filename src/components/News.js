import React, { Component } from 'react'
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: "general"
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
    
  constructor(props){
      super();
      this.state = {
          articles : [],
          loading : false,
          page:1
      }
    }

    capitalizeFirstLetter =(string)=>{
      return string.charAt(0).toUpperCase()+string.slice(1);
    }
    
    async componentDidMount(){
      document.title = this.props.catgeory==='general'?'NewsBurst | Your daily burst of news!':`NewsBurst | ${this.capitalizeFirstLetter(this.props.catgeory)}`
      let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.catgeory}&apiKey=3485e89642174006af5f2806b58118da&page=1&pageSize=${this.props.pageSize}`;
      console.log(url)
      this.setState({loading:true});
      let data = await fetch(url);
      let parsedData = await data.json()
      console.log(parsedData)
      this.setState({
        articles:parsedData.articles,
        totalResults: parsedData.totalResults,
        loading:false
      })
  }

  handlePrevClick = async()=>{
    console.log("Prev");
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.catgeory}&apiKey=3485e89642174006af5f2806b58118da&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData)
    this.setState({
      page:this.state.page-1,
      articles:parsedData.articles,
      loading:false
    })
  }

  handleNextClick=async()=>{
    console.log("Next");
    if(!(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
      let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.catgeory}&apiKey=3485e89642174006af5f2806b58118da&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true});
      let data = await fetch(url);
      let parsedData = await data.json()
      this.setState({
        page:this.state.page+1,
        articles:parsedData.articles,
        loading:false
      });
    }
    else{
      
    }
  }

  render() {
    return (
      <div>
        <div className="container my-3">
            <h2 style={{margin:'35px 0px'}}>{this.props.catgeory==='general'?`Top Headlines`:`Top ${this.capitalizeFirstLetter(this.props.catgeory)} Headlines`}</h2>
            {/* If loading, show spinner */}
            {this.state.loading && <Spinner/>}
            <div className="row">
            {!this.state.loading && this.state.articles.map((element)=>{
              return <ul className="list-group" key={element.url}>
                <li style={{backgroundColor:'#F8F8F8'}} className="list-group-item my-2"><NewsItem key={element.url} title={element.title?element.title.slice(0,50):""} description={element.description?element.description.slice(0,80):""} imageUrl={element.urlToImage?element.urlToImage:"https://static.vecteezy.com/system/resources/thumbnails/006/299/370/original/world-breaking-news-digital-earth-hud-rotating-globe-rotating-free-video.jpg"} newsUrl={element.url?element.url:"#"} author={element.author?element.author:"Unknown"} date={element.publishedAt} source={element.source.name}/></li>
              </ul>
                // return <div className="col-md-4" key={element.url}>
                //         <NewsItem title={element.title?element.title.slice(0,50):""} description={element.description?element.description.slice(0,80):""} imageUrl={element.urlToImage?element.urlToImage:"https://static.vecteezy.com/system/resources/thumbnails/006/299/370/original/world-breaking-news-digital-earth-hud-rotating-globe-rotating-free-video.jpg"} newsUrl={element.url?element.url:"#"} author={element.author?element.author:"Unknown"} date={element.publishedAt} source={element.source.name}/>
                //     </div>
                
            })}
            </div>
        </div>
        <div className="container d-flex justify-content-between mb-4">
            <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
            <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick} >Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
