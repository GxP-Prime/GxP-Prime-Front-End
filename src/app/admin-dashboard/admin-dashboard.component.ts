import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DataService } from '../services/data.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css', '../../css/typography.css', '../../css/color.css', '../../css/universal.css']
})
export class AdminDashboardComponent implements OnInit {

  assemblyData: Array<Object> = [];
  assemblyNewData: Array<Object> = [];
  allParts: any = [];

  statusCodes: Object = {
    "TO_BE_ASSEMBLED": "ASSEMBLE",
    "TO_BE_MANUFACTURED": "MANUFACTURE",
    "TO_BE_PURCHASED": "PURCHASED",
    "MANUFACTURED": "MANUFACTURED",
    "PURCHASED": "PURCHASED",
    "IN_PROCESS": "IN PROCESS",
    "READY_TO_SHIP": "Ready To Ship"
  }

  showCreateFlag: boolean = false;

  constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.dataService.setParts().then(response => {
      this.assemblyData = [];
      this.allParts = response;
      let assemblyItems = {};
      this.dataService.getAssembly().then(response => {
        assemblyItems =  response as Array<object>;
        for(let i in assemblyItems) {
          if(!assemblyItems[i].parentAssembly) {
            let partNum = assemblyItems[i].part.split("#")[1];
            for(let j=0; j<this.allParts.length; j++) {
              if(this.allParts[j].partNo == partNum) {
                assemblyItems[i].partNumber = partNum;
                assemblyItems[i].partName = this.allParts[j].partName;
                assemblyItems[i].status = this.statusCodes[assemblyItems[i].status];
                assemblyItems[i].partType = this.allParts[j].type.split("_").join(" ");
                break;
              }
            }
            this.assemblyData.push(assemblyItems[i]);
            this.assemblyNewData = this.assemblyData;
          }
        }
      }).catch(err => {
        console.log(err);
      })
    })

    // this.dataService.getDashboardData().subscribe(data => {
    //   this.assemblyData = JSON.parse(data["_body"]);
    // })

    // this.dataService.getParts().subscribe(data => {
    //   console.log(JSON.parse(data["_body"]));
    // })
  }

  cardClicked(obj) {
    let promises = [];
    for(let i=0; i<obj.childAssembly.length; i++) {
      promises.push(this.childComponent(obj.childAssembly[i].split('#')[1]))
    }
    Promise.all(promises).then(response => {
      this.dataService.setAssemblyComponents(response);
      this.dataService.setBreadcrumbArray(obj.partNumber);
      this.router.navigate(['/v1/assembly/' + obj.uid]);
    })
  }

  childComponent(id) {
    return new Promise((resolve, reject) => {
      this.dataService.getChildComponent(id).then(response => {
        resolve(response)
      }).catch(err => {
        reject(err);
      })
    })
  }

  createAssembly() {
    if(this.showCreateFlag) {
      this.showCreateFlag = false;
    } else {
      this.showCreateFlag = true;
    }
  }

  createButton() {
    let uid = (document.getElementById("newUid") as HTMLInputElement).value;
    let newPartNum = (document.getElementById("newPartNum") as HTMLInputElement).value;
    let jsonObj = {};
    jsonObj["$class"] = "org.company.healthcare.Assembly";
    jsonObj["uid"] = uid;
    jsonObj["status"] = "TO_BE_ASSEMBLED";
    jsonObj["part"] = newPartNum
    jsonObj["assemblyQuality"] = "Pending"
    this.dataService.createAssembly(jsonObj).subscribe(data => {
      this.ngOnInit();
      this.showCreateFlag = false;
    }, error => {
      console.log(error);
    })
  }

}
