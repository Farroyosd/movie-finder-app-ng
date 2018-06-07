import { Component, OnInit } from '@angular/core';
import axios from 'axios'



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchInput: string = '';
  searchError: boolean = false;
  searchData: any[] = [];
  constructor() { }

  ngOnInit() {
  }

  search() {
    if (this.searchInput === '') {
      this.searchError = true;
      this.searchData=[];
    } else {
      this.searchError = false;
      axios
        .get('https://www.omdbapi.com/?s=' + this.searchInput + '&apikey=8730e0e')
        .then(res => {
          let searchArr = []
          res.data.Search.forEach(movie => {
            axios
              .get('https://www.omdbapi.com/?i=' + movie.imdbID + '&apikey=8730e0e')
              .then(res => {
                let cap = res.data.Type[0].toUpperCase();
                let end = res.data.Type.substr(1);
                res.data.Type = cap + end;
                searchArr.push(res.data);
              })
              .catch(err => err)
          });
          this.searchData = searchArr
          
        })
        .catch(err => err)
    }
  }
}
