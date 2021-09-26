<template>
    <div>
        <b-table responsive striped hover show-empty :items="reports" :fields="fields" :per-page="perPage" :current-page="currentPage" :filter="filter" :filterIncludedFields="filterOn" @filtered="onFiltered">
            <template v-slot:cell(#)="row">
                <p>{{row.index + 1}}</p>
            </template>
        </b-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentPage: 1,
            perPage: 5,
            fields: ['#', { key: 'programTime', }, { key: 'event', }, 'message', 'actualTime',],
            filter: null,
            filterOn: [],
            form: new Form({
                id: '',
                title: '',
                description: '',
                snippet: ''
            }),
            reports:[{
                programTime:'12:00:30',
                event:'start',
                message:'Start 16 servers',
                actualTime:'10:00:30am',
            }]
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
    }
}
</script>