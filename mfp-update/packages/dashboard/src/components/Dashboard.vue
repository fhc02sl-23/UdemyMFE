<template>
  <div class="p-grid p-fluid dashboard">
    <!-- ===== KPIs (pretty finance cards) ===== -->
    <div class="p-col-12 p-lg-4">
      <div class="kpi">
        <div>
          <div class="kpi-title">Portfolio Value</div>
          <div class="kpi-sub">Market value of holdings</div>
        </div>
        <div class="kpi-value positive">$12,000</div>
      </div>
    </div>

    <div class="p-col-12 p-lg-4">
      <div class="kpi">
        <div>
          <div class="kpi-title">Open Positions</div>
          <div class="kpi-sub">Number of holdings</div>
        </div>
        <div class="kpi-value">7</div>
      </div>
    </div>

    <div class="p-col-12 p-lg-4">
      <div class="kpi">
        <div>
          <div class="kpi-title">Day P/L</div>
          <div class="kpi-sub">Profit / Loss today</div>
        </div>
        <!-- use 'negative' instead of 'positive' to color red -->
        <div class="kpi-value positive">+ $3,200</div>
      </div>
    </div>

    <!-- ===== Asset highlight rows (BTC / ETH / AAPL / TSLA) ===== -->
    <div class="p-col-12 p-md-6 p-xl-3">
      <div class="highlight-box">
        <div class="initials" style="background-color:#1976d2;color:#0b3b73">
          <span>BTC</span>
        </div>
        <div class="highlight-details">
          <i class="pi pi-chart-line"></i>
          <span>24h Change</span>
          <span class="count">+3.4%</span>
        </div>
      </div>
    </div>

    <div class="p-col-12 p-md-6 p-xl-3">
      <div class="highlight-box">
        <div class="initials" style="background-color:#ef6262;color:#a83d3b">
          <span>ETH</span>
        </div>
        <div class="highlight-details">
          <i class="pi pi-chart-line"></i>
          <span>24h Change</span>
          <span class="count">-1.2%</span>
        </div>
      </div>
    </div>

    <div class="p-col-12 p-md-6 p-xl-3">
      <div class="highlight-box">
        <div class="initials" style="background-color:#20d077;color:#038d4a">
          <span>AAPL</span>
        </div>
        <div class="highlight-details">
          <i class="pi pi-arrow-right-arrow-left"></i>
          <span>Day Move</span>
          <span class="count">+0.8%</span>
        </div>
      </div>
    </div>

    <div class="p-col-12 p-md-6 p-xl-3">
      <div class="highlight-box">
        <div class="initials" style="background-color:#f9c851;color:#b58c2b">
          <span>TSLA</span>
        </div>
        <div class="highlight-details">
          <i class="pi pi-arrow-right-arrow-left"></i>
          <span>Day Move</span>
          <span class="count">+1.5%</span>
        </div>
      </div>
    </div>

    <!-- ===== Tasks ===== -->
    <div class="p-col-12 p-md-6 p-lg-4">
      <Panel header="Tasks" style="height: 100%">
        <ul class="task-list">
          <li>
            <Checkbox name="task" value="reports" v-model="tasksCheckbox" />
            <span class="task-name">Rebalance portfolio </span>
            <i class="pi pi-chart-bar" />
          </li>
          <li>
            <Checkbox name="task" value="invoices" v-model="tasksCheckbox" />
            <span class="task-name">Review dividends </span>
            <i class="pi pi-dollar" />
          </li>
          <li>
            <Checkbox name="task" value="meeting" v-model="tasksCheckbox" />
            <span class="task-name">Call broker </span>
            <i class="pi pi-users" />
          </li>
          <li>
            <Checkbox name="task" value="flight" v-model="tasksCheckbox" />
            <span class="task-name">Export tax report </span>
            <i class="pi pi-briefcase" />
          </li>
        </ul>
      </Panel>
    </div>

    <!-- ===== Contact form (kept as example UI) ===== -->
    <div class="p-col-12 p-md-6 p-lg-4 p-fluid contact-form">
      <Panel header="Contact Advisor">
        <div class="p-grid">
          <div class="p-col-12">
            <Dropdown
              v-model="dropdownCity"
              :options="dropdownCities"
              optionLabel="name"
              placeholder="Select a City"
            />
          </div>
          <div class="p-col-12">
            <InputText type="text" placeholder="Name" />
          </div>
          <div class="p-col-12">
            <InputText type="text" placeholder="Age" />
          </div>
          <div class="p-col-12">
            <InputText type="text" placeholder="Message" />
          </div>
          <div class="p-col-12">
            <Button type="button" label="Send" icon="pi pi-envelope" />
          </div>
        </div>
      </Panel>
    </div>

    <!-- ===== Activity ===== -->
    <div class="p-col-12 p-lg-4">
      <Panel header="Activity" style="height: 100%">
        <div class="activity-header">
          <div class="p-grid">
            <div class="p-col-6">
              <span style="font-weight: bold">Last Activity</span>
              <p>Updated 1 minute ago</p>
            </div>
            <div class="p-col-6" style="text-align: right">
              <Button label="Refresh" icon="pi pi-refresh" />
            </div>
          </div>
        </div>

        <ul class="activity-list">
          <li>
            <div class="p-d-flex p-jc-between p-ai-center p-mb-3">
              <h5 class="activity p-m-0">Income</h5>
              <div class="count">$900</div>
            </div>
            <ProgressBar :value="95" :showValue="false" />
          </li>
          <li>
            <div class="p-d-flex p-jc-between p-ai-center p-mb-3">
              <h5 class="activity p-m-0">Tax</h5>
              <div class="count" style="background-color:#f9c851">$250</div>
            </div>
            <ProgressBar :value="24" :showValue="false" />
          </li>
        </ul>
      </Panel>
    </div>

    <!-- ===== Recent Sales / Holdings table (demo) ===== -->
    <div class="p-col-12 p-lg-6">
      <div class="card">
        <h1 style="font-size:16px">Recent Trades</h1>
        <DataTable
          :value="products"
          class="p-datatable-customers"
          :rows="5"
          style="margin-bottom:20px"
          :paginator="true"
        >

          <Column field="name" header="Ticker" :sortable="true"></Column>
          <Column field="category" header="Category" :sortable="true"></Column>
          <Column field="price" header="Price" :sortable="true">
            <template #body="slotProps">
              {{ formatCurrency(slotProps.data.price) }}
            </template>
          </Column>
          <Column>
            <template #header> Actions </template>
            <template #body>
              <Button icon="pi pi-search" class="p-button-success p-mr-2 p-mb-1" />
              <Button icon="pi pi-times" class="p-button-danger p-mb-1" />
            </template>
          </Column>
        </DataTable>
      </div>
    </div>

    <!-- ===== Chart ===== -->
    <div class="p-col-12 p-lg-6">
      <div class="card">
        <Chart type="line" :data="lineData" />
      </div>
    </div>
  </div>
</template>

<script>
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';

import Checkbox from 'primevue/checkbox';
import Panel from 'primevue/panel';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import Chart from 'primevue/chart';
import ProgressBar from 'primevue/progressbar';

export default {
  components: {
    ProgressBar,
    Checkbox,
    Panel,
    Dropdown,
    InputText,
    Button,
    Column,
    DataTable,
    Chart,
  },
  data() {
    return {
      tasksCheckbox: [],
      dropdownCities: [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' },
      ],
      dropdownCity: null,
      products: [
        { image: 'bamboo-watch.jpg', name: 'AAPL', category: 'Equity', price: 174.1 },
        { image: 'black-watch.jpg', name: 'TSLA', category: 'Equity', price: 214.7 },
        { image: 'blue-band.jpg', name: 'BTC', category: 'Crypto', price: 62431.0 },
        { image: 'blue-t-shirt.jpg', name: 'ETH', category: 'Crypto', price: 2975.3 },
      ],
      lineData: {
        labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul'],
        datasets: [
          {
            label: 'Portfolio NAV',
            data: [65, 59, 80, 81, 56, 55, 70],
            fill: false,
            backgroundColor: '#2f4860',
            borderColor: '#2f4860',
          },
          {
            label: 'Benchmark',
            data: [60, 61, 75, 68, 60, 57, 62],
            fill: false,
            backgroundColor: '#00bb7e',
            borderColor: '#00bb7e',
          },
        ],
      },
    };
  },
  methods: {
    formatCurrency(value) {
      return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    },
  },
};
</script>

<style lang="scss" scoped>
/* ---------- Small spacing improvement between grid items ---------- */
.p-grid > [class*="p-col-"] { margin-bottom: 12px; }

/* ---------- Cards ---------- */
.card {
  background-color: #ffffff;
  padding: 1em;
  margin-bottom: 16px;
  border-radius: 10px;
  border: 1px solid #e9ecef;
  box-shadow: 0 1px 3px rgba(0,0,0,.06);
}

/* ---------- Pretty KPI cards ---------- */
.kpi {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  border-radius: 10px;
  padding: 14px 18px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  border: 1px solid #e9ecef;
  min-height: 84px;
}
.kpi-title { font-size: 14px; font-weight: 600; color: #2e2e2e; }
.kpi-sub   { margin-top: 4px; font-size: 12px; color: #757575; }
.kpi-value { font-size: 24px; font-weight: 700; letter-spacing: .2px; color: #2e2e2e; }
.kpi-value.positive { color: #0a9150; }
.kpi-value.negative { color: #c0392b; }

/* ---------- Highlight rows (BTC/ETH/AAPL/TSLA) ---------- */
.highlight-box {
  height: 100px;
  display: flex;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,.05);
  border: 1px solid #e9ecef;
}
.highlight-box .initials {
  width: 45%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1em;
}
.highlight-box .initials > span { font-size: 32px; font-weight: 800; letter-spacing: .5px; }
.highlight-box .highlight-details {
  width: 55%;
  background-color: #ffffff;
  padding: 1em;
  border-left: 1px solid #eef1f4;
}
.highlight-box .highlight-details i {
  font-size: 18px;
  vertical-align: middle;
  margin-right: .5em;
}
.highlight-box .highlight-details > span:first-of-type {
  display: block;
  font-size: 12px;
  color: #6c757d;
  margin-top: 2px;
}
.highlight-box .count {
  color: #2e2e2e;
  font-size: 24px;
  margin-top: 4px;
  display: block;
  font-weight: 700;
}

/* ---------- Tasks / Activity lists minor polish ---------- */
.task-list { list-style: none; margin: 0; padding: 0; }
.task-list li {
  padding: .5em .25em;
  border-bottom: 1px solid #e9ecef;
}
.task-list .task-name { margin-left: .5rem; }

/* Activity */
.activity-list { list-style: none; margin: 0; padding: 0; }
.activity-list li { border-bottom: 1px solid #e9ecef; padding: 16px 8px; }
.activity-list .count {
  font-size: 14px;
  color: #ffffff;
  background-color: #1976d2;
  font-weight: 700;
  padding: 0.25em 0.5em;
  border-radius: 6px;
}

/* ---------- Responsive table tweak ---------- */
@media screen and (max-width: 960px) {
  ::v-deep(.p-datatable).p-datatable-customers {
    .p-datatable-thead > tr > th,
    .p-datatable-tfoot > tr > td {
      display: none !important;
    }
    .p-datatable-tbody > tr {
      border-bottom: 1px solid #dee2e6;
      > td {
        text-align: left;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border: 0 none !important;
        width: 100% !important;
      }
    }
  }
}

/* ---------- Page background ---------- */
.dashboard { background-color: #edf0f5; }
</style>
