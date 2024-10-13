import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'; // Adjust path to your service
import {
  ApexChart,
  ApexAxisChartSeries,
  ApexXAxis,
  ApexTitleSubtitle,
} from 'ng-apexcharts';
import { User } from 'src/app/Models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  // Data for the column chart
  public columnChartSeries: ApexAxisChartSeries = [{ name: 'Users', data: [] }];
  public columnChartOptions: ApexChart = {
    type: 'bar',
  };
  userData: User[] = [];
  public columnChartXAxis: ApexXAxis = {
    categories: [], // This will hold the categories (like user roles or status)
  };
  public columnChartTitle: ApexTitleSubtitle = {
    text: 'User Distribution',
    align: 'center',
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userService.getUsers().subscribe((res: any[]) => {
      this.userData = res;
      this.prepareChartData(res);
    });
  }

  prepareChartData(users: any[]): void {
    const roleCounts: { [key: string]: number } = {};

    users.forEach((user) => {
      if (roleCounts[user.role]) {
        roleCounts[user.role]++;
      } else {
        roleCounts[user.role] = 1;
      }
    });

    this.columnChartXAxis.categories = Object.keys(roleCounts);
    this.columnChartSeries = [
      {
        name: 'Users',
        data: Object.values(roleCounts),
      },
    ];
  }

  // Line Chart Data
  lineChartSeries = [
    {
      name: 'User Registrations',
      data: [30, 40, 35, 50, 49, 60, 70], // Example data for registrations
    },
  ];

  lineChartOptions: any = {
    chart: {
      type: 'line', // Specify the chart type
      height: 350,
    },
    stroke: {
      curve: 'smooth', // Smooth line
    },
    title: {
      text: 'User Registrations Over Time',
      align: 'left',
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'], // Example months
    },
    dataLabels: {
      enabled: false, // Disable data labels on points
    },
    markers: {
      size: 4, // Marker size on the line
    },
    grid: {
      borderColor: '#e0e0e0', // Light grid color
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
  };
}
