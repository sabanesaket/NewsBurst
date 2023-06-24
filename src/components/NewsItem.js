import React, { Component } from 'react'

export class NewsItem extends Component {

  handleImgLoadError(event){
    console.log("Image Load Error")
    event.target.src = "https://static.vecteezy.com/system/resources/thumbnails/006/299/370/original/world-breaking-news-digital-earth-hud-rotating-globe-rotating-free-video.jpg"
  }

  render() {
    let {title,description,imageUrl,newsUrl, author, date, source} = this.props
    let formattedDate = new Date(date);
    let publishedDate = formattedDate.getDate()
    let publishedMonth = formattedDate.getMonth()
    let publishedYear = formattedDate.getFullYear()
    let myMonthMapping = {1:"January", 2:"February", 3:"March", 4:"April", 5:"May", 6:"June", 7:"July", 8:"August", 9:"September", 10:"October", 11:"November", 12:"December"}
    let dateLastDigit = publishedDate%10;
    let isdateLastDigit1 = dateLastDigit===1;
    let isdateLastDigit2 = dateLastDigit===2;
    let isdateLastDigit3 = dateLastDigit===3;
    return (
      <div>
        {/* <div className="card"> */}
            <span className="position-absolute top-0 translate-middle badge rounded-pill bg-dark" style={{left:'88%',zIndex:'1'}}>{source}</span>
            <div className="row">
              <div className="col-md-2">
                <img src={imageUrl} onError={this.handleImgLoadError} className="card-img-top" alt="..."/>
              </div>
              <div className="col-md-8">
                    <h5 className="card-title">{title}...</h5>
                    <p className="card-text">{description}...</p>
                    <p className="card-text"><small className='text-muted'>By {author} on {publishedDate}{isdateLastDigit1?"st":isdateLastDigit2?"nd":isdateLastDigit3?"rd":"th"} {myMonthMapping[publishedMonth]} {publishedYear}</small></p>
              </div>
              <div className="col-md-2 my-4">
                <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-dark">Read More</a>
              </div>
            </div>
        {/* </div> */}
      </div>
    )
  }

}

export default NewsItem

