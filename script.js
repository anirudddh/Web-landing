const greetings = $('#greeting'),
    nameGreet = $('#name_to_greet'),
    clock = $('#clock'),
    date = $('#date'),
    todays_up = $('#todays_up')

function date_time() {
    const date_now = new Date();
    const year = date_now.getFullYear()
    const month = date_now.getMonth()
    const day = date_now.getDate()
    const wday = date_now.getDay()
    const hour = date_now.getHours()
    const mins = date_now.getMinutes()
    const sec = date_now.getSeconds()
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const timeAbbr = hour >= 12 ? "PM" : "AM";
    hr = hour % 12 || 12;
    if (hour == 5 && mins <= 35) {
        $('body').css('background-image', 'var(--dawn)')
    } else if (hour >= 6 && hour < 12) {
        $('body').css('background-image', 'var(--morning)')
        $('body').css('color', 'var(--light-font-color)')
    } else if (hour >= 12 && hour < 17) {
        $('body').css('background-image', 'var(--afternoon)')
        $('body').css('color', 'var(--light-font-color)')
    } else if (hour == 18) {
        $('body').css('background-image', 'var(--sunset)')
        $('body').css('color', 'var(--light-font-color)')
    } else if (hour > 18) {
        $('body').css('background-image', 'var(--evening)')
        $('body').css('color', 'var(--light-font-color)')
    }
    if (hour < 12) {
        greetings.text('Good Morning, ')
    } else if (hour < 18) {
        greetings.text('Good Afternoon, ')
    } else if (hour >= 18) {
        greetings.text('Good Evening, ')
    }
    time = String(hr).padStart(2, 0) + ":" + String(mins).padStart(2, 0) + ":" + String(sec).padStart(2, 0) + "<br/>" + timeAbbr
    dd = days[wday] + ", " + months[month] + " " + day + ", " + year
    clock.html(time)
    date.text(dd)

}
date_time()
var clockInterval = setInterval(() => {
    date_time()
}, 1000)

function override_time(type = 'morning') {
    clearInterval(clockInterval)
    if (type == "morning") {
        $('body').css('background-image', 'var(--morning)')
        $('body').css('color', 'var(--light-font-color)')
        greetings.text('Good Morning, ')
        clock.html("06:23:14<br>AM")
    } else if (type == "dawn") {
        $('body').css('background-image', 'var(--dawn)')
        $('body').css('color', 'var(--light-font-color)')
        greetings.text('Good Morning, ')
        clock.html("05:33:14<br>AM")
    } else if (type == "evening") {
        $('body').css('background-image', 'var(--evening)')
        $('body').css('color', 'var(--light-font-color)')
        greetings.text('Good Evening, ')
        clock.html("07:15:14<br>PM")

    } else if (type == "afternoon") {
        $('body').css('background-image', 'var(--afternoon)')
        $('body').css('color', 'var(--light-font-color)')
        greetings.text('Good Afternoon, ')
        clock.html("04:14:10<br>PM")

    } else if (type == "sunset") {
        $('body').css('background-image', 'var(--sunset)')
        $('body').css('color', 'var(--light-font-color)')
        greetings.text('Good Evening, ')
        clock.html("06:25:02<br>PM")

    } else if (type == "live") {
        date_time()
        clockInterval = setInterval(() => {
            date_time()
        }, 1000)
    }
}

function addslashes(string) {
    return string.replace(/\\/g, '\\\\').
    replace(/\u0008/g, '\\b').
    replace(/\t/g, '\\t').
    replace(/\n/g, '\\n').
    replace(/\f/g, '\\f').
    replace(/\r/g, '\\r').
    replace(/'/g, '\\\'').
    replace(/"/g, '\\"');
}
$(function() {
    var name = !!localStorage.getItem('name_to_greet') ? localStorage.getItem('name_to_greet') : false;
    var paragraph = !!localStorage.getItem('todays_up') ? localStorage.getItem('todays_up') : false
    if (name) {
        nameGreet.html(name)
    }
    if (paragraph) {
        todays_up.html(paragraph)
    }
    $('body').removeClass('loading')
    $('[editable]').click(function() {
        $(this).attr('contenteditable', true).focus()
        $(this).on('keypress', function(e) {
            if (e.which == 13 && !e.shiftKey) {
                console.log('hit enter')
                $(this).removeAttr('contenteditable')
            }
        })
        $(this).on('focusout', function() {
            localStorage.setItem($(this).attr('id'), $(this).html())
        })
    })
    $('.override_time').click(function() {
        override_time($(this).attr('id'))
    })
})