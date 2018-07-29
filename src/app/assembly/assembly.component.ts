import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlatformLocation } from '@angular/common'

import { DataService } from '../services/data.service';

@Component({
  selector: 'app-assembly',
  templateUrl: './assembly.component.html',
  styleUrls: ['./assembly.component.css', '../../css/typography.css', '../../css/color.css', '../../css/universal.css']
})
export class AssemblyComponent implements OnInit {

  id: number = -1;
  dropdownContent = [
    { id: 1, name: "Components" },
    { id: 2, name: "Actions" }
  ];
  showComponents: boolean = true;
  componentData: Array<Object> = [];
  breadcrumbArray: Array<string> = [];

  statusCodes: Object = {
    "TO_BE_ASSEMBLED": "ASSEMBLE",
    "TO_BE_MANUFACTURED": "MANUFACTURE",
    "TO_BE_PURCHASED": "PURCHASE",
    "MANUFACTURED": "MANUFACTURED",
    "PURCHASED": "PURCHASED",
    "IN_PROCESS": "IN PROCESS",
    "READY_TO_SHIP": "Ready To Ship"
  }

  transactionCodes: Object = {
    "TO_BE_ASSEMBLED": "ASSEMBLE",
    "TO_BE_MANUFACTURED": "MANUFACTURE",
    "TO_BE_PURCHASED": "PURCHASE",
    "MANUFACTURED": "MANUFACTURED",
    "PURCHASED": "PURCHASED",
    "IN_PROCESS": "QUALITY CHECK",
    "READY_TO_SHIP": "Ready To Ship"
  }

  constructor(private route: ActivatedRoute, private router: Router, private dataService: DataService, location: PlatformLocation) {
    location.onPopState(() => {
      this.dataService.removeBreadcrumbArray();
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['uid'];
      this.breadcrumbArray = this.dataService.getBreadcrumbArray();
      let componentData = this.dataService.getAssemblyComponents();
      let allParts = this.dataService.getParts();
      
      // console.log(allParts);
      this.componentData = [];

      for(let i=0; i<componentData.length; i++) {
        if(componentData[i]["parentAssembly"]) {
          let partNum = componentData[i]["part"].split("#")[1];
          for(let j=0; j<allParts.length; j++) {
            if(allParts[j]["partNo"] == partNum) {
              componentData[i]["partNumber"] = partNum;
              componentData[i]["partName"] = allParts[j]["partName"];
              componentData[i]["action"] = this.transactionCodes[componentData[i]["status"]]
              componentData[i]["status"] = this.statusCodes[componentData[i]["status"]]
              componentData[i]["partType"] = allParts[j]["type"].split("_").join(" ");
              break;
            }
          }
          this.componentData.push(componentData[i]);
        }
      }
      console.log(this.componentData);
      // change the view if components array is empty
      // this.router.navigate(['/v1/assembly'], { replaceUrl: true });
    });
  }

  onChangeDropdown(event) {
    let dropdownValue = event.target.value;
    if(dropdownValue == 1) {
      this.showComponents = true;
    } else {
      this.showComponents = false;
    }
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

  getUpdatedValues() {
    let promises = [];
    for(let i=0; i<this.componentData.length; i++) {
      promises.push(this.childComponent(this.componentData[i]["uid"]))
    }
    Promise.all(promises).then(response => {
      this.dataService.setAssemblyComponents(response);
      this.ngOnInit();
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

  completeAction(obj) {
    if(obj.action == "ASSEMBLE") {
      let jsonObj = {}
      jsonObj["$class"] = "org.company.healthcare.Assembling";
      jsonObj["toAssembleAssembly"] = "resource:org.company.healthcare.Assembly#" + obj.uid;
      jsonObj["assemblingAdmin"] = "resource:org.company.healthcare.Admin#4242";
      let endpoint = "/Assembling"
      this.dataService.performTransaction(jsonObj, endpoint).subscribe(response => {
        this.getUpdatedValues();
      }, error => {
        console.log(error);
        alert(error);
      });
    } else if(obj.action == "MANUFACTURE") {
      let jsonObj = {}
      jsonObj["$class"] = "org.company.healthcare.Manufacturing";
      jsonObj["toManufactureAssembly"] = "resource:org.company.healthcare.Assembly#" + obj.uid;
      jsonObj["manufacturingAdmin"] = "resource:org.company.healthcare.Admin#4242";
      let endpoint = "/Manufacturing"
      this.dataService.performTransaction(jsonObj, endpoint).subscribe(response => {
        this.getUpdatedValues();
      }, error => {
        let arr = JSON.parse(error["_body"])["error"]["message"].split("Error:");
        let len = arr.length - 1;
        alert(arr[len]);
      });
    } else if(obj.action == "PURCHASE") {
      let jsonObj = {}
      jsonObj["$class"] = "org.company.healthcare.Procuring";
      jsonObj["procuredAssembly"] = "resource:org.company.healthcare.Assembly#" + obj.uid;
      jsonObj["procurementAdmin"] = "resource:org.company.healthcare.Admin#4242";
      let endpoint = "/Procuring"
      this.dataService.performTransaction(jsonObj, endpoint).subscribe(response => {
        this.getUpdatedValues();
      }, error => {
        console.log(error);
        alert(error);
      });
    } else if(obj.action == "QUALITY CHECK") {
      let jsonObj = {}
      jsonObj["$class"] = "org.company.healthcare.QualityCheck";
      jsonObj["qualityCheckAssembly"] = "resource:org.company.healthcare.Assembly#" + obj.uid;
      jsonObj["qualityAdmin"] = "resource:org.company.healthcare.Admin#4242";
      let endpoint = "/QualityCheck"
      this.dataService.performTransaction(jsonObj, endpoint).subscribe(response => {
        this.getUpdatedValues();
      }, error => {
        console.log(error);
        alert(error);
      });
    } else {
      alert("No further action can be performed");
    }
  }

}
