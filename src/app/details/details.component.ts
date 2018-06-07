import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios  from 'axios';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  movieDataDetails=[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    let id = ""
    this.route.params.subscribe(res=> id = res.id);

      axios
      .get('https://www.omdbapi.com/?i=' + id + '&apikey=8730e0e')
      .then(res=> { this.movieDataDetails = [res.data]; console.log('then',this.movieDataDetails)})
      .catch(err=>err)
  }

}
