
async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function bubbleSort(arr) {
    const len = arr.length;
    let swapped;
    
    do {
      swapped = false;
      
      for (let i = 0; i < len - 1; i++) {
        if (arr[i] > arr[i + 1]) {
          // Меняем элементы местами
          let temp = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = temp;
          
          swapped = true;

        var barElem1 = $('div.bar[index="' + i + '"]');
        var barElem2 = $(`div.bar[index="${i + 1}"]`);
        
        barElem1.addClass('activeBar')
        barElem2.addClass('activeBar')
        

        if (arr[i] == 0) {
            barElem1.css('height', "1px");
        } else {
            barElem1.css('height', `${arr[i]}%`);
        }

        if (arr[i+1] == 0) {
            barElem2.css('height', "1px");
        } else {
            barElem2.css('height', `${arr[i + 1]}%`);
        }
        await sleep(100);
        barElem1.removeClass('activeBar')
        barElem2.removeClass('activeBar')
          // Отображение и задержка для иллюстрации сортировки
          //await displayBars(arr);
          
        }
      }
    } while (swapped);
    
    return arr;
  }

  async function displayBars(arr) {
    const barsDiv = $('#bars');
    barsDiv.empty();
    
    for (let i = 0; i < arr.length; i++) {
      const barHeight = arr[i] * 10;
      const bar = $('<div>').addClass('bar').css('height', barHeight + 'px');
      barsDiv.append(bar);
    }
  }

  $('#add').on('click', function(){
    nextIndex = $('#bars').children().length
    newInput = "<input type=\"number\" value=\"0\" min = \"0\" max=\"100\" index = \"" + nextIndex + "\">"
    $('.initial_array').append(newInput)
    newBar = "<div class=\"bar\" index = \"" + nextIndex + "\"></div>"
    $('#bars').append(newBar)
  })

  $('#rand').click(function() {
    $('.initial_array input[type="number"]').each(function() {
        var min = parseInt($(this).attr('min'));
        var max = parseInt($(this).attr('max'));
        var randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
        $(this).val(randomNum);

        currIndex = $(this).attr('index')
        var barElem = $('div.bar[index="' + currIndex + '"]');
        if(randomNum == 0) {
            barElem.css('height', "1px")
        } else {
            barElem.css('height', randomNum + "%")
        }

    });
  });

  $('#sort').click(function() {
    var values = []
    $('.initial_array input[type="number"]').each(function() {
        values.push(parseInt($(this).val()))
    })
    console.log(values)
    bubbleSort(values)
  })

  $('.initial_array').on('input change', 'input[type="number"]', function() {
    
    let newValue = $(this).val();
    if(newValue > 100) {
        $(this).val(100)
        newValue = 100
    } else if(newValue < 0) {
        $(this).val(0)
        newValue = 0
    }
    let currIndex = $(this).attr('index');
    var barElem = $('div.bar[index="' + currIndex + '"]');
    if (newValue == 0) {
      barElem.css('height', "1px");
    } else {
      barElem.css('height', newValue + "%");
    }
  });
  
  // Пример использования
  const array = [6, 4, 9, 2, 1, 7, 5, 8, 3];
  /*bubbleSort(array).then(sortedArray => {
    console.log('Отсортированный массив:', sortedArray);
  });*/