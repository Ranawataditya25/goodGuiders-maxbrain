import { themeColors } from '../api/config';
export const doctskill = {

    series: [44, 55, 30, 43],
    chart: {
        height: 410,
        type: 'pie',
        labels: ['Operations', 'Endoscopic', 'Patient Care', 'Patient Visit'],
        legend: {
            position: 'bottom'
        },
        colors: [themeColors.themeprimary,themeColors.themesecondary,themeColors.themeinfo,themeColors.themewarning],
        responsive: [
            {
                breakpoint: 1400,
                options: {
                    chart: {
                        height: 280,
                    },
                }
            }
        ]
    }
}


  
export const Gallerydata = [
    {
        "imgsrc": "pages/gallery/1.jpg"
    },
    {
        "imgsrc": "pages/gallery/2.jpg"
    },
    {
        "imgsrc": "pages/gallery/3.jpg"
    },
    {
        "imgsrc": "pages/gallery/4.jpg"
    },
    {
        "imgsrc": "pages/gallery/5.jpg"
    },
    {
        "imgsrc": "pages/gallery/6.jpg"
    },
    {
        "imgsrc": "pages/gallery/7.jpg"
    },
    {
        "imgsrc": "pages/gallery/8.jpg"
    },
    {
        "imgsrc": "pages/gallery/9.jpg"
    }
]
