import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-auditors',
  templateUrl: './auditors.component.html',
  styleUrls: ['./auditors.component.css', '../../css/typography.css', '../../css/color.css', '../../css/universal.css']
})
export class AuditorsComponent implements OnInit {

  auditorData: Array<object> = [];
  auditorQualityData: any;
  auditorAssemblyData: any;
  auditorProcurementData: any;
  auditorManufacturingData: any;

  qualityFlag: boolean = false;
  assemblyFlag: boolean = false;
  procurementFlag: boolean = false;
  manufacturingFlag: boolean = false;

  tempData: Array<object> = [
    {
      "$class": "org.company.healthcare.Procuring",
      "procuredAssembly": "resource:org.company.healthcare.Assembly#CT20180364GNTRY0051XRAY941CATH78952",
      "procurementAdmin": "resource:org.company.healthcare.Admin#4242",
      "transactionId": "eebeb1abbd0eb6cc4ed5f1353d67fd34d5b89445a29713e1c7570a71fe49d243",
      "timestamp": "2018-07-29T06:19:43.070Z"
    }, {
      "$class": "org.company.healthcare.Procuring",
      "procuredAssembly": "resource:org.company.healthcare.Assembly#CT20180364GNTRY0051XRAY941CATH78952",
      "procurementAdmin": "resource:org.company.healthcare.Admin#4242",
      "transactionId": "eebeb1abbd0eb6cc4ed5f1353d67fd34d5b89445a29713e1c7570a71fe49d243",
      "timestamp": "2018-07-29T06:19:43.070Z"
    }
  ];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getAuditorQualityData()
    .subscribe(data => {
      this.auditorQualityData = JSON.parse(data["_body"]);
      if(this.auditorQualityData.length == 0) {
        this.qualityFlag = false;
      } else {
        this.qualityFlag = true;
        for(let i=0;i<this.auditorQualityData.length; i++) {
          this.auditorQualityData[i]["procuredAssembly"] = this.auditorQualityData[i]["procuredAssembly"].split("#")[1];
          this.auditorQualityData[i]["procurementAdmin"] = "Admin" + this.auditorQualityData[i]["procurementAdmin"].split("#")[1];
          this.auditorQualityData[i]["timestamp"] = this.auditorQualityData[i]["timestamp"].split("T")[0];
        }
      }
    });
    this.dataService.getAuditorAssemblyData().subscribe(data => {
      this.auditorAssemblyData = JSON.parse(data["_body"]);
      if(this.auditorAssemblyData.length == 0) {
        this.assemblyFlag = false;
      } else {
        this.assemblyFlag = true;
        for(let i=0;i<this.auditorAssemblyData.length; i++) {
          this.auditorAssemblyData[i]["procuredAssembly"] = this.auditorAssemblyData[i]["procuredAssembly"].split("#")[1];
          this.auditorAssemblyData[i]["procurementAdmin"] = "Admin" + this.auditorAssemblyData[i]["procurementAdmin"].split("#")[1];
          this.auditorAssemblyData[i]["timestamp"] = this.auditorAssemblyData[i]["timestamp"].split("T")[0];
        }
      }
    });
    this.dataService.getAuditorProcurementData().subscribe(data => {
      this.auditorProcurementData = JSON.parse(data["_body"]);
      if(this.auditorProcurementData.length == 0) {
        this.procurementFlag = false;
      } else {
        this.procurementFlag = true;
        for(let i=0;i<this.auditorProcurementData.length; i++) {
          this.auditorProcurementData[i]["procuredAssembly"] = this.auditorProcurementData[i]["procuredAssembly"].split("#")[1];
          this.auditorProcurementData[i]["procurementAdmin"] = "Admin" + this.auditorProcurementData[i]["procurementAdmin"].split("#")[1];
          this.auditorProcurementData[i]["timestamp"] = this.auditorProcurementData[i]["timestamp"].split("T")[0];
        }
      }
    });
    this.dataService.getAuditorManufacturingData().subscribe(data => {
      this.auditorManufacturingData = JSON.parse(data["_body"]);
      if(this.auditorManufacturingData.length == 0) {
        this.manufacturingFlag = false;
      } else {
        this.manufacturingFlag = true;
        for(let i=0;i<this.auditorManufacturingData.length; i++) {
          this.auditorManufacturingData[i]["procuredAssembly"] = this.auditorManufacturingData[i]["procuredAssembly"].split("#")[1];
          this.auditorManufacturingData[i]["procurementAdmin"] = "Admin" + this.auditorManufacturingData[i]["procurementAdmin"].split("#")[1];
          this.auditorManufacturingData[i]["timestamp"] = this.auditorManufacturingData[i]["timestamp"].split("T")[0];
        }
      }
    });
  }

}
