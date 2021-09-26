<template>
    <div>
        <div class="card ">
            <div class="card-header bg-dark text-white">
                <div class="row">
                    <div class="col-md-5">
                        <h4> Task Reports</h4>
                    </div>
                    <div class="col-md-4">
                    </div>
                    <div class="col-md-3">
                        <button type="button" class="btn btn-primary">Generate Reports</button>
                    </div>
                </div>
            </div>
            <div class="card-body">
                 <div class="row">
                            <div class="col-sm-12 col-md-6">
                                <div class="dataTables_length" id="DataTables_Table_1_length">
                                    <label>
                                            Show
                                            <select v-model="perPage" name="DataTables_Table_1_length" aria-controls="DataTables_Table_1" class="custom-select custom-select-sm form-control form-control-sm">
                                                <option value="5">5</option>
                                                <option value="8">8</option>
                                                <option value="15">15</option>
                                                <option value="20">20</option>
                                            </select>
                                            entries
                                        </label>
                                </div>
                            </div>
                            <div class="col-sm-12 col-md-6">
                                <div id="DataTables_Table_1_filter" class="dataTables_filter">
                                    <label>Search:<input v-model="filter" type="search" class="form-control form-control-sm" placeholder="" aria-controls="DataTables_Table_1" /></label>
                                </div>
                            </div>
                        </div>
                <b-table responsive striped hover show-empty  :small="small" :items="reports" :fields="fields" :per-page="perPage" :current-page="currentPage" :filter="filter" :filterIncludedFields="filterOn" @filtered="onFiltered">
                    <template v-slot:cell(#)="row">
                            <p>{{row.index + 1}}</p>
                    </template>
                </b-table>
            </div>
            <div class="card-footer ">
                <div class="row">
                    <div class="col-md-7"></div>
                    <div class="col-md-5">
                        <b-pagination style="float:left" v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="my-table"></b-pagination>
                    </div>
                </div>
            </div>
        </div>
       
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentPage: 1,
            perPage: 5,
            fields: ['#', { key: 'programTime', }, { key: 'event', }, 'message', 'actualTime', ],
            filter: null,
            filterOn: [],
            reports: []
        }
    },
    computed: {
        rows() {
            return this.reports.length
        }
    },
    methods: {
        onFiltered(filteredItems) {
            this.totalRows = filteredItems.length;
            this.currentPage = 1
        },
        getTasks() {
            axios.get("/api/tasks")
                .then(({ data }) => {
                    this.reports = data.data;
                    this.totalRows = this.reports.length;
                })
                .catch((e) => {
                    console.log(error)
                });
        }
    },
    mounted() {
        this.getTasks();
    }
}
</script>