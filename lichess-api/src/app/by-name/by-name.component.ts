import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {elementAt} from "rxjs/operators";

class RedditPost {
  public title: string;
  public upvotes: number;
  public post: string;
  public id: string;

  public comment1: string = "";
  public comment2: string = "";
  public comment3: string = "";
  public comment4: string = "";
  public comment5: string = "";
  public comment6: string = "";
  public commentUpvotes1: string = "";
  public commentUpvotes2: string = "";
  public commentUpvotes3: string = "";
  public commentUpvotes4: string = "";
  public commentUpvotes5: string = "";
  public commentUpvotes6: string = "";


  constructor(title: string, upvotes: number, post: string, id: string) {
    this.title = title;
    this.upvotes = upvotes;
    this.post = post;
    this.id = id;
  }
}

@Component({
  selector: 'app-by-name',
  templateUrl: './by-name.component.html',
  styleUrls: ['./by-name.component.css']
})
export class ByNameComponent implements OnInit {
  byName: any;
  redditPost: RedditPost[] = [];
  a = 0;

  constructor(private http: HttpClient) {
  }

  async ngOnInit() {
    this.getByName();
    let delayres2 = await this.delay(900);
    this.getComments()
    console.log(this.redditPost)
    while (0 < 1) {
      let delayres = await this.delay(2000);
      this.a += 1;
      if (this.a > 24) {
        this.a = 0;
      }
    }
  }

  getByName() {
    this.http.get<any>('https://www.reddit.com/r/dankmemes.json').subscribe(
      response => {
        console.log(response.data.children);
        this.byName = response.data.children;
        this.byName.shift();
        this.byName.forEach((element: any) => {
          if (element.data.post_hint === "image") {
            this.redditPost.push(new RedditPost(
              element.data.title,
              element.data.score,
              element.data.url_overridden_by_dest,
              element.data.id
            ))
          }
        })
      }
    )
  }

  getComments() {
    this.redditPost.forEach((element2: any, i) => {
      this.http.get<any>("https://www.reddit.com/r/dankmemes/comments/" + element2.id + ".json").subscribe(
        response2 => {
          if (response2[1].data.children[1].data !== undefined) {
            element2.comment1 = response2[1].data.children[1].data.body;
            element2.commentUpvotes1 = response2[1].data.children[1].data.score;
            if (response2[1].data.children[1].data.replies.data !== undefined) {
              element2.comment2 = response2[1].data.children[1].data.replies.data.children[0].data.body;
              element2.commentUpvotes2 = response2[1].data.children[1].data.replies.data.children[0].data.score;
              if (response2[1].data.children[1].data.replies.data.children[0].data.replies.data !== undefined) {
                element2.comment3 = response2[1].data.children[1].data.replies.data.children[0].data.replies.data.children[0].data.body;
                element2.commentUpvotes3 = response2[1].data.children[1].data.replies.data.children[0].data.replies.data.children[0].data.score;
              }
            }
          }
          if (response2[1].data.children[2].data !== undefined) {
            element2.comment4 = response2[1].data.children[2].data.body;
            element2.commentUpvotes4 = response2[1].data.children[2].data.score;
            if (response2[1].data.children[2].data.replies.data !== undefined) {
              element2.comment5 = response2[1].data.children[2].data.replies.data.children[0].data.body;
              element2.commentUpvotes5 = response2[1].data.children[2].data.replies.data.children[0].data.score;
              if (response2[1].data.children[2].data.replies.data.children[0].data.replies.data !== undefined) {
                element2.comment6 = response2[1].data.children[2].data.replies.data.children[0].data.replies.data.children[0].data.body;
                element2.commentUpvotes6 = response2[1].data.children[2].data.replies.data.children[0].data.replies.data.children[0].data.score;
              }
            }
          }
        })
    })
  }

  delay(delayInms: number) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(2);
      }, delayInms);
    });
  }
}
