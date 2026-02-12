document.addEventListener('DOMContentLoaded', function() {
    const giftItems = document.querySelectorAll('.gift-item');
    const messageContainer = document.getElementById('messageContainer');
    const messageText = document.getElementById('messageText');
    const resetButton = document.getElementById('resetButton');
    
    // Nội dung chúc mừng cho mỗi hộp quà
    const giftMessages = {
        1: {
            title: '🎉 Chúc Mừng Sinh Nhật! 🎉',
            messages: [
               'Chúc em tuổi mới luôn vui.',
                'Cười thật nhiều mỗi ngày nha.',
                'Mong em luôn xinh đẹp, hạnh phúc.',
                'Sinh nhật thật vui nhé 🎂✨'
            ]
        },
        2: {
            title: '🎂 Chúc Mừng Sinh Nhật! 🎂',
            messages: [
                'Chúc em tuổi mới thật xinh.',
                'Mỗi ngày đều nhiều nụ cười.',
                'Gặp được em là một điều đặc biệt.',
                'Sinh nhật thật hạnh phúc nhé ❤️✨'
            ]
        },
        3: {
            title: '✨ Chúc Mừng Sinh Nhật! ✨',
            messages: [
                'Ngày sinh nhật là ngày đặc biệt của em,',
                'Chúc em tuổi mới luôn rạng rỡ ✨',
                'Mỗi ngày đều có lý do để cười 😊',
                'Mong em luôn thấy mình được yêu thương 💛',
                'Chúc em sinh nhật thật xinh 🌸💕🎂'
            ]
        }
    };

    /**
     * Tạo hiệu ứng icon rơi
     */
    function createFallingIcons(giftNumber) {
        // Chọn icon phù hợp với món quà
        let icons;
        switch(giftNumber) {
            case '1': // Bông hoa
                icons = ['🌸', '🌺', '🌻', '🌼', '🌷', '🌹', '💐', '🏵️', '🌵', '🍀'];
                break;
            case '2': // Trái tim
                icons = ['❤️', '💕', '💖', '💗', '💓', '💝', '💘', '💞', '💟', '♥️'];
                break;
            case '3': // Sinh nhật
                icons = ['🎂', '🎈', '🎉', '🎊', '🎁', '🎀', '🥳', '🍰', '🧁', '🎇'];
                break;
            default:
                icons = ['🌸', '🌺', '🌻'];
        }
        
        const numberOfIcons = 30;
        
        for (let i = 0; i < numberOfIcons; i++) {
            setTimeout(() => {
                const icon = document.createElement('div');
                icon.className = 'flower';
                icon.textContent = icons[Math.floor(Math.random() * icons.length)];
                
                // Vị trí ngẫu nhiên theo chiều ngang
                icon.style.left = Math.random() * 100 + '%';
                
                // Bắt đầu từ trên đỉnh màn hình
                icon.style.top = '-50px';
                
                // Thời gian rơi ngẫu nhiên (3-6 giây)
                const duration = 3 + Math.random() * 3;
                icon.style.animationDuration = duration + 's';
                
                // Delay ngẫu nhiên
                icon.style.animationDelay = Math.random() * 0.5 + 's';
                
                document.body.appendChild(icon);
                
                // Xóa icon sau khi animation hoàn thành
                setTimeout(() => {
                    icon.remove();
                }, (duration + 0.5) * 1000);
            }, i * 100); // Thêm delay giữa các icon
        }
    }

    /**
     * Xử lý sự kiện click vào mỗi phần quà
     */
    giftItems.forEach(item => {
        item.addEventListener('click', function() {
            // Ngăn click nhiều lần
            if (this.classList.contains('clicked')) return;
            
            const giftNumber = this.getAttribute('data-gift');
            
            // Tạo hiệu ứng icon rơi theo món quà
            createFallingIcons(giftNumber);
            
            // Thêm animation bounce và biến mất cho phần quà được chọn
            this.classList.add('clicked');
            
            // Ẩn các phần quà khác
            giftItems.forEach(g => {
                if (g !== this) {
                    g.classList.add('hidden');
                }
            });
            
            // Đợi animation bounce hoàn thành rồi mới hiển thị message (1 giây)
            setTimeout(() => {
                displayMessage(giftNumber);
            }, 1000);
        });
    });

    /**
     * Hàm hiển thị message
     */
    function displayMessage(giftNumber) {
        const giftData = giftMessages[giftNumber];
        
        // Tính toán HTML cho các dòng chúc mừng
        let messagesHTML = '';
        giftData.messages.forEach((msg, index) => {
            const isLastMessage = index === giftData.messages.length - 1;
            const style = isLastMessage ? ' style="margin-top: 10px; font-weight: bold; font-style: italic;"' : '';
            messagesHTML += `<p class="greeting-text"${style}>${msg}</p>`;
        });
        
        messageText.innerHTML = messagesHTML;
        messageContainer.classList.add('show');
    }

    /**
     * Reset button - quay lại chọn quà
     */
    resetButton.addEventListener('click', function(e) {
        e.stopPropagation();
        
        // Xóa tất cả các hoa còn lại
        document.querySelectorAll('.flower').forEach(flower => flower.remove());
        
        messageContainer.classList.remove('show');
        giftItems.forEach(item => {
            item.classList.remove('clicked');
            item.classList.remove('hidden');
        });
        messageText.innerHTML = '';
    });
});
