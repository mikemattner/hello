<template>
    <div class="temperature-skeleton">
        <section class="weather-icon">
            <div class="icon-container">
            </div>
        </section>
        <section class="weather-data">
            <div class="temperature-value-block">
                <div class="weather-data__left">
                    <div class="temp-block current-temperature__value">
                    </div>
                </div>
                <div class="weather-data__right">
                    <div class="temp-block temperature__high">
                    </div>
                    <div class="temp-block temperature__low">
                    </div>
                </div>
            </div>
            <div class="weather-data__location">
                <div class="temp-block">
                </div>
            </div>
        </section>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup () {
        

        return {}
    }
})
</script>

<style scoped lang="scss">
.temperature-skeleton {
    display: flex;
    justify-content: center;
    align-items: center;
}
.weather-icon {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.icon-container {
    width: 80px;
    height: 80px;
    border-radius: 40px;
    background-color: var(--tooltip-bg);
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
    overflow: hidden;
    position: relative;

    &:after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        cursor: progress;
        background: linear-gradient(0.25turn, transparent, var(--card-bg), transparent);
        background-repeat: no-repeat;
        background-position: -100px 0;
        animation: loading 1.5s infinite;
        z-index: 2;
    }
}

.temp-block {
    background-color: var(--tooltip-bg);
    aspect-ratio: 1;
    overflow: hidden;
    position: relative;

    &:after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        cursor: progress;
        background: linear-gradient(0.25turn, transparent, var(--card-bg), transparent);
        background-repeat: no-repeat;
        background-position: -100px 0;
        animation: loading 1.5s infinite;
        z-index: 2;
    }
}

@keyframes loading {
  to {
    background-position: 100px 0;
  }
}

.weather-data {
    height: 60px;
    width: 130px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    line-height: 1;
    &__location {
        font-size: 0.675rem;
        margin-top: 0;
        width: 100%;
        height: 12px;
        margin-top: 10px;
        .temp-block {
            width: 100%;
            height: 12px;
        }
    }
    .temperature-value-block {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    &__left,
    &__right {
        display: flex;
    }
    &__left {
        justify-content: center;
        align-items: flex-start;
        margin-right: 0.5rem;
        width: 100px;
        height: 60px;

        .temp-block {
            width: 100px;
            height: 60px;
        }
    }
    &__right {
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
    }
    &__value {
        font-size: 2rem;
        font-weight: 700;
    }
    .temperature__high,
    .temperature__low {
        margin: 0.125rem 0;
        font-size: 0.675rem;
        display: flex;
        justify-content: center;
        width: 12px;
        height: 12px;
    }
}
</style>