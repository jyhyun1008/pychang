
# 개요

> 서당고양이도 딥러닝 3년이면 풍월을 읊는다!

라는 모토로 만들어지고 있는, Pix2Pix와 STFT 방법을 통해 노랫소리를 합성하는 AI 음성 합성 엔진입니다. 현재는 딱히 유저 인터페이스는 없고, 오로지 하드 코딩을 통해서만 음성 합성이 가능합니다.

# Pix2Pix

다음과 같은 AI 이미지를 보신 적 있으셨을 거예요.

![images_wilko97_post_752a4441-2653-4532-be4d-ec2edf02493e_image](https://github.com/jyhyun1008/seodangcat/assets/93899740/ef813cab-50bc-485f-8a00-18eee4d68203)

여기에 사용되었던 방법이 바로 Pix2Pix였답니다. 간단한 스케치를 하면 거의 완성된 이미지를 출력해 주는 AI 이미지 생성기였죠.

이 Pix2Pix를 접하면서, 목소리의 주파수 이미지인 STFT 데이터를 가지고 음성 파일을 생성할 수 없을지 고민하기 시작했어요.

![image](https://github.com/jyhyun1008/seodangcat/assets/93899740/755a3218-1514-4137-b87c-e2dede342d0d)
