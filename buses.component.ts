import { Component, OnInit,PLATFORM_ID,Inject,Input} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { BackEndService,SecurityService} from '../services/index';
@Component({
  selector: 'app-buses',
  templateUrl: './buses.component.html',
  styleUrls: ['./buses.component.scss']
})
export class BusesComponent implements OnInit {
	
  buses: any;
  loading = false;	
  @Input() slug: any;
  
  constructor(
  private securityService: SecurityService,
  private backEndService: BackEndService,  
  @Inject(PLATFORM_ID) private platformId: Object){ }

  ngOnInit(){
	
	var request = {
                key: SecurityService.encrypt('busService'),
                value: SecurityService.encrypt(this.slug.toString())
            }
		this.loading = true;
		this.backEndService.postData(request)
            .subscribe(
                data => {
					this.loading = false;				
						
					if(data.message){
						this.buses=JSON.parse(SecurityService.decrypt(data.data));
						
						
					}else{
						console.log('error');
					}
                   
                },
                error => {
                   console.log(error);
                });
	

  }
	

}
