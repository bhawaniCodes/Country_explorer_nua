export const state = () => ({
    cities: [
        {
            "id": 3350606,
            "wikiDataId": "Q24668",
            "type": "CITY",
            "city": "Aixirivall",
            "name": "Aixirivall",
            "country": "Andorra",
            "countryCode": "AD",
            "region": "Sant Julià de Lòria",
            "regionCode": "06",
            "regionWdId": "Q24282",
            "latitude": 42.46245,
            "longitude": 1.50209,
            "population": 1025
        },
        {
            "id": 3216144,
            "wikiDataId": "Q24656",
            "type": "CITY",
            "city": "Aixovall",
            "name": "Aixovall",
            "country": "Andorra",
            "countryCode": "AD",
            "region": "Sant Julià de Lòria",
            "regionCode": "06",
            "regionWdId": "Q24282",
            "latitude": 42.47635833,
            "longitude": 1.48949167,
            "population": 69
        },
        {
            "id": 3406038,
            "wikiDataId": "Q4699394",
            "type": "CITY",
            "city": "Aixàs",
            "name": "Aixàs",
            "country": "Andorra",
            "countryCode": "AD",
            "region": "Sant Julià de Lòria",
            "regionCode": "06",
            "regionWdId": "Q24282",
            "latitude": 42.48638889,
            "longitude": 1.46722222,
            "population": 0
        },
        {
            "id": 3673384,
            "wikiDataId": "Q2522163",
            "type": "CITY",
            "city": "Andorra la Vella",
            "name": "Andorra la Vella",
            "country": "Andorra",
            "countryCode": "AD",
            "region": "Andorra la Vella",
            "regionCode": "07",
            "regionWdId": "Q2522163",
            "latitude": 42.5,
            "longitude": 1.5,
            "population": 22615
        },
        {
            "id": 397,
            "wikiDataId": "Q1863",
            "type": "CITY",
            "city": "Andorra la Vella",
            "name": "Andorra la Vella",
            "country": "Andorra",
            "countryCode": "AD",
            "region": "Andorra la Vella",
            "regionCode": "07",
            "regionWdId": "Q2522163",
            "latitude": 42.5,
            "longitude": 1.5,
            "population": 24042
        }
    ],
    isGridView: true,
    color: {
        background: '#000000 !important',
        text: '#FFFFFF !important'
    }
})

export const getters = {
    getCities (state) {
        return state.cities || [];
    },
    getCurrentView (state) {
        return state.isGridView;
    },
    getColors (state) {
        return state.color || {};
    }
}

export const mutations = {
    UPDATE_CITIES_LIST (state, countryList) {
        state.cities = countryList;
    },
    CHANGE_VIEW (state, flag) {
        state.isGridView = flag;
    }
}

export const actions = {
    async fetchCitiesList ({state, commit}, {limit, offset=0, namePrefix}) {
        let url = `/v1/geo/cities?limit=${limit}&offset=${offset}`;
        if (namePrefix) {
            url += `&namePrefix=${namePrefix}`;
        }
        const headers = {
            'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
            'x-rapidapi-key': this.$config.key,
            'Content-type': 'application/json'
        }
        try {
            const res = await this.$axios.get(url, {headers});
            if (res && Object.values(res).length && res.data && Object.values(res.data).length) {
                commit('UPDATE_CITIES_LIST', res.data.data);
                return res.data.data;
            }
        } catch (error) {
            console.log('error in country data fetch', e)
        }
    },
    async fetchNearbyCities ({state}, cityId) {
        const url = `/v1/geo/cities/${cityId}/nearbyCities?radius=100`;
        const headers = {
            'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
            'x-rapidapi-key': process.env.KEY,
            'Content-type': 'application/json'
        }
        try {
            const res = await this.$axios.get(url, {headers});
            if (res && Object.values(res).length && res.data && Object.values(res.data).length) {
                return res.data.data;
            }
        } catch (error) {
            
        }
    },
    changeView ({commit}, flag) {
        commit('CHANGE_VIEW', flag);
    }
}